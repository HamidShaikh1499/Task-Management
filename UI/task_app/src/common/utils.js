class Utils {
    setItemToStorage = (value, key) => {
        localStorage.setItem(key, value);
    }

    getItemFromStorage = (key) => {
        const item = localStorage.getItem(key);
        if (item) {
            return item;
        }

        return null;
    }

    clearStorage = () => {
        return localStorage.clear();
    }

    classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    formatString = (stringToFormat, ...args) => {
        const newString = stringToFormat.replace(/{(\d+)}/g, (match, index) => {
            return args[index];
        });
        return newString;
    }
}

export default new Utils();
