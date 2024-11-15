const path = require('path') // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js', // Точка входа для сборки проекта

	output: {
		filename: 'bundle.js', // Имя выходного файла сборки
		path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
	},

	module: {
		rules: [
			{
				test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
				use: ['style-loader', 'css-loader'], // Загрузчики, используемые для обработки CSS-файлов
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: true,
			chunks: ['index'],
			filename: 'index.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/main.html',
			inject: true,
			chunks: ['index'],
			filename: 'main.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/projects.html',
			inject: true,
			chunks: ['index'],
			filename: 'projects.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/tasks.html',
			inject: true,
			chunks: ['index'],
			filename: 'tasks.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/info.html',
			inject: true,
			chunks: ['index'],
			filename: 'info.html',
		}),
	],

	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'), // Каталог для статики
		},
		open: true, // Автоматически открывать браузер
	},

	mode: 'development', // Режим сборки
}
