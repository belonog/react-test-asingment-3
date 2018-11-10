const utils = {

    trottling(func, delay = 1000) {
        let callTimer = 0;

        return function (...params) {
            clearTimeout(callTimer);

            callTimer = setTimeout(() => {
                func(...params);
            }, delay);
        };
    },
};

export default utils;
