import '../css/global.scss';

if (process.env.NODE_ENV !== "production") {
	require('./routers/router.dev');
} else {
	require('./routers/router.dist');
}

