#!/bin/bash

# ----------------------
# KUDU Deployment Script
# ----------------------
echo "Starting the KUDU deployment script"

# Helpers
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
    exit 1
  fi
}

# Prerequisites
# -------------

# Verify node.js installed
hash node 2>/dev/null
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment."

# Setup
# -----

SCRIPT_DIR="${BASH_SOURCE[0]%\\*}"
SCRIPT_DIR="${SCRIPT_DIR%/*}"
ARTIFACTS=$SCRIPT_DIR/../artifacts
KUDU_SYNC_CMD=${KUDU_SYNC_CMD//\"}

DEPLOYMENT_TOOLS=/home/site/deployments/tools
YARN_DIR=$DEPLOYMENT_TOOLS/yarn
TMP_DIR=/tmp

if [[ ! -n "$DEPLOYMENT_SOURCE" ]]; then
  DEPLOYMENT_SOURCE=$SCRIPT_DIR
fi

if [[ ! -n "$NEXT_MANIFEST_PATH" ]]; then
  NEXT_MANIFEST_PATH=$ARTIFACTS/manifest

  if [[ ! -n "$PREVIOUS_MANIFEST_PATH" ]]; then
    PREVIOUS_MANIFEST_PATH=$NEXT_MANIFEST_PATH
  fi
fi

if [[ ! -n "$DEPLOYMENT_TARGET" ]]; then
  DEPLOYMENT_TARGET=$ARTIFACTS/wwwroot
else
  KUDU_SERVICE=true
fi

if [[ ! -n "$KUDU_SYNC_CMD" ]]; then
  # Install kudu sync
  echo Installing Kudu Sync
  npm install kudusync -g --silent
  exitWithMessageOnError "Installing Kudu-Sync with npm failed"

  if [[ ! -n "$KUDU_SERVICE" ]]; then
    # In case we are running locally this is the correct location of kuduSync
    KUDU_SYNC_CMD=kuduSync
  else
    # In case we are running on kudu service this is the correct location of kuduSync
    KUDU_SYNC_CMD=$APPDATA/npm/node_modules/kuduSync/bin/kuduSync
  fi
fi

# Install Yarn
# ------------

echo "Installing yarn"
if [[ ! -e "$YARN_DIR" ]]; then
  cd "$TMP_DIR"
  eval wget https://github.com/yarnpkg/yarn/releases/download/v1.16.0/yarn-v1.16.0.tar.gz -O yarn.tar.gz
  exitWithMessageOnError "Downloading Yarn failed"
  
  eval tar -xzf yarn.tar.gz -C "$DEPLOYMENT_TOOLS"
  exitWithMessageOnError "Extracting archive failed"
  cd - > /dev/null

  cd "$DEPLOYMENT_TOOLS"
  eval ln -s yarn-v1.16.0/bin/yarn yarn
  exitWithMessageOnError "Symlink failed"
  cd - > /dev/null
fi

YARN_VERSION="$(yarn -v)"

if [[ -e "$DEPLOYMENT_TOOLS/yarn" ]]; then
  echo "Found Yarn v$YARN_VERSION"
else
  exitWithMessageOnError "Couldn't find Yarn"
fi

# Node Helpers
# ------------

selectNodeVersion () {
  if [[ -n "$KUDU_SELECT_NODE_VERSION_CMD" ]]; then
    SELECT_NODE_VERSION="$KUDU_SELECT_NODE_VERSION_CMD \"$DEPLOYMENT_SOURCE\" \"$DEPLOYMENT_TARGET\" \"$DEPLOYMENT_TEMP\""
    eval $SELECT_NODE_VERSION
    exitWithMessageOnError "select node version failed"

    if [[ -e "$DEPLOYMENT_TEMP/__nodeVersion.tmp" ]]; then
      NODE_EXE=`cat "$DEPLOYMENT_TEMP/__nodeVersion.tmp"`
      exitWithMessageOnError "getting node version failed"
    fi
    
    if [[ -e "$DEPLOYMENT_TEMP/.tmp" ]]; then
      NPM_JS_PATH=`cat "$DEPLOYMENT_TEMP/__npmVersion.tmp"`
      exitWithMessageOnError "getting npm version failed"
    fi

    if [[ ! -n "$NODE_EXE" ]]; then
      NODE_EXE=node
    fi

    NPM_CMD=yarn
  else
    NPM_CMD=yarn
    NODE_EXE=node
  fi
}

##################################################################################################################################
# Deployment
# ----------

echo "Handling node.js deployment, running on $DEPLOYMENT_SOURCE/deploy.sh"

# 1. Select NodeJs version 
echo "1. Select NodeJs Version."
selectNodeVersion
echo "Use $NPM_CMD to resolve packages"

# 2. Install Packages using Yarn
echo "2. Install $NPM_CMD packages"
if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then
  cd "$DEPLOYMENT_SOURCE"
  eval "$NPM_CMD" install --network-timeout 1000000 --ignore-engines
  exitWithMessageOnError "Installing npm packages failed"
  echo "Finished installing npm packages"
  cd - > /dev/null
fi

# 3. Build React App
echo "3. Build React App"
if [ -e "$DEPLOYMENT_SOURCE/node_modules" ]; then 
  cd "$DEPLOYMENT_SOURCE"
  eval "$NPM_CMD" build
  exitWithMessageOnError "Build failed!"
  echo "Build finished"
  cd - > /dev/null
fi

# 4. KuduSync
echo "4. KuduSync to '$DEPLOYMENT_TARGET'"
if [ -e "$DEPLOYMENT_SOURCE/build" ]; then
 cd "$DEPLOYMENT_SOURCE"
 eval "$KUDU_SYNC_CMD" -v 100 -f "$DEPLOYMENT_SOURCE/build" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH"
 exitWithMessageOnError "Kudu Sync failed!"
 cd - > /dev/null
fi

# ##################################################################################################################################

# Post deployment stub
if [[ -n "$POST_DEPLOYMENT_ACTION" ]]; then
  POST_DEPLOYMENT_ACTION=${POST_DEPLOYMENT_ACTION//\"}
  cd "${POST_DEPLOYMENT_ACTION_DIR%\\*}"
  "$POST_DEPLOYMENT_ACTION"
   exitWithMessageOnError "post deployment action failed"
fi

echo "Finished successfully."