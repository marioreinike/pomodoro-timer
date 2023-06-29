import Router from '@koa/router';
import sessionsRoutes from './sessions';

const router = new Router();

router.get('/', (ctx) => {
  ctx.status = 200;
});

router.use('/sessions', sessionsRoutes.routes());

export default router;
