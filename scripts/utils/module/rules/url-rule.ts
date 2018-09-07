export const urlRule = {
    test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
    loader: 'url-loader',
    options: {
        name: `[name].[ext]`,
        limit: 10000
    }
}
