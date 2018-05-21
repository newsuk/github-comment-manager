import createAction from './actions/create';
import readAction from './actions/read';
import updateAction from './actions/update';
import deleteAction from './actions/delete';

export default {
  create: createAction,
  read: readAction,
  update: updateAction,
  delete: deleteAction
};
