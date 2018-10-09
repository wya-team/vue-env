import '../css/global.scss';
import xxx from '../../node_modules/test/a';

console.log(xxx);

if (process.env.NODE_ENV !== "production") {
	require('./routers/router.dev');
} else {
	require('./routers/router.dist');
}

