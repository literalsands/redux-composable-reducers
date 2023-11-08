const map = reducer => (state, action) => {
    let updated = false;
    if (Array.isArray(state)) {
        return state.reduce((state, value, i) => {
            const nextValue = reducer(value, action);
            if (nextValue !== value) {
                if (!updated) {
                    state = state.slice();
                    updated = true;
                }
                state[i] = nextValue;
            }
            return state;
        }, state)
    }
    if (state instanceof Object) {
        return Object.entries(state).reduce((state, [key, value]) => {
            const nextValue = reducer(value, action);
            if (nextValue !== value) {
                if (!updated) {
                    state = { ...state};
                    updated = true;
                }
                state[key] = nextValue;
            }
            return state;
        }, state)
    }
    return state;
}
export default map;
