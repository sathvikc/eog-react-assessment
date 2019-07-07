import { takeEvery, call } from "redux-saga/effects";
import { toast } from "react-toastify";

function* apiErrorReceived(action) {
  yield call(toast.error, `Error Received: ${action.error}`);
}

function* watchApiError() {
  yield takeEvery('EVENT/API_ERROR_RECEIVED', apiErrorReceived);
}

export default [watchApiError];
