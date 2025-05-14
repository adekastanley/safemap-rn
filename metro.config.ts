const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const {
	wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

config.resolver.assetExts.push("cjs"); // Ensure `.cjs` files are resolved

module.exports = wrapWithReanimatedMetroConfig(config);
