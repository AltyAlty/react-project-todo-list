import type {StorybookConfig} from "@storybook/react-webpack5";
import * as path from "node:path";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/preset-create-react-app",
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        '@storybook/addon-storysource',
        '@storybook/addon-docs',
        '@storybook/addon-actions',
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    // test: [/\.stories\.jsx?$/], This is default
                    include: [path.resolve(__dirname, '../src')], // You can specify directories
                },
                loaderOptions: {
                    prettierConfig: {printWidth: 80, singleQuote: false},
                    injectStoryParameters: false,
                },
            },
        },
        // {
        //     name: '@storybook/addon-storysource',
        //     options: {
        //         rule: {
        //             test: [/\.stories\.jsx?$/],
        //         },
        //         loaderOptions: {
        //             sourceLoaderOptions: {
        //                 injectStoryParameters: false,
        //             },
        //         },
        //     }
        // }
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    staticDirs: ["..\\public"],
};

export default config;