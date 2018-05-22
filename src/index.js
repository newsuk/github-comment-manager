import createAction from './actions/create';
import readAction from './actions/read';
import updateAction from './actions/update';
import removeAction from './actions/remove';

export default {
  create: createAction,
  read: readAction,
  update: updateAction,
  remove: removeAction
};
