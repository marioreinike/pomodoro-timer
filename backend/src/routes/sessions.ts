import Router from '@koa/router';
import Session from '../models/session';

const router = new Router();

// LIST
router.get('/', async (ctx) => {
  const sessions = await Session.findAll({ order: [['createdAt', 'DESC']] });
  ctx.body = sessions;
});

// CREATE
router.post('/', async (ctx) => {
  try {
    const postData = ctx.request.body as Partial<Session>;
    const session = await Session.create(postData);
    ctx.body = session;
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.param('sessionId', async (id, ctx, next) => {
  ctx.state.session = await Session.findByPk(id);
  if (!ctx.state.session) {
    ctx.throw(404, 'Session not found.');
  }
  await next();
});

// SHOW
router.get('/:sessionId', async (ctx) => {
  const { session } = ctx.state;
  ctx.body = session;
});

// UPDATE
router.put('/:sessionId', async (ctx) => {
  const { session } = ctx.state as { session: Session };
  const postData = ctx.request.body as Partial<Session>;
  try {
    await session.update(postData);
    ctx.body = session;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// DELETE
router.delete('/:sessionId', async (ctx) => {
  const { session } = ctx.state as { session: Session };
  await session.destroy();
  ctx.body = session;
});

export default router;
