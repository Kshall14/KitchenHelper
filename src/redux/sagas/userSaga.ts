// src/redux/sagas/userSaga.ts
import { call, put, takeLatest, take, all } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import auth from '@react-native-firebase/auth';
import { setUser, clearUser, setLoading, setError } from '../slices/userSlice';
import { User } from '../../components/Types';
import { CommonActions } from '@react-navigation/native';
// Helper function to create an auth channel
function createAuthChannel() {
  return eventChannel((emit) => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        emit({ uid: user.uid, email: user.email, displayName: user.displayName });
      } else {
        emit(null);
      }
    });
    return unsubscribe; // Return the unsubscribe function
  });
}

// Sign-up saga
function* signUpSaga(action: { type: string; payload: { email: string; password: string; displayName: string } }) {
  try {
    yield put(setLoading(true));
    const { email, password, displayName } = action.payload;

    // Create user with email and password
    const userCredential: { user: { uid: string; email: string | null; updateProfile: (profile: { displayName: string }) => Promise<void> } } = yield call(
      [auth(), auth().createUserWithEmailAndPassword],
      email,
      password
    );

    // Set the user's display name
    yield call([userCredential.user, userCredential.user.updateProfile], {
      displayName,
    });

    // Dispatch the setUser action
    yield put(
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName,
      })
    );
    
  } catch (error) {
    if (error instanceof Error) {
      yield put(setError(error.message));
    } else {
      yield put(setError('An unknown error occurred'));
    }
  } finally {
    yield put(setLoading(false));
  }
}

// Sign-in saga
function* signInSaga(action: { type: string; payload: { email: string; password: string } }) {
  try {
    yield put(setLoading(true));
    const { email, password } = action.payload;

    // Sign in with email and password
    const userCredential: { user: { uid: string; email: string | null; displayName: string | null } } = yield call(
      [auth(), auth().signInWithEmailAndPassword],
      email,
      password
    );

    // Dispatch the setUser action
    yield put(
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(setError(error.message));
    } else {
      yield put(setError('An unknown error occurred'));
    }
  } finally {
    yield put(setLoading(false));
  }
}

// Listen for auth state changes
function* listenForAuthChangesSaga() {
  const authChannel = createAuthChannel();

  try {
    while (true) {
      const user: User | null = yield take(authChannel);
      if (user) {
        yield put(setUser(user));
      } else {
        yield put(clearUser());
      }
    }
  } finally {
    authChannel.close(); // Close the channel when done
  }
}

// Watch for user-related actions
export function* watchUserSaga() {
  yield all([
    takeLatest('user/signUpRequest', signUpSaga),
    takeLatest('user/signInRequest', signInSaga),
    takeLatest('user/listenForAuthChanges', listenForAuthChangesSaga),
  ]);
}