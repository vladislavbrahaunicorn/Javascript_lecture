var newObj = {
    //TODO
    _value: 0,
    oldValues: 0,
    /**
     * @param {number} newValue
     */
    set value(newValue){
        this.oldValues = this._value + this.oldValues
        this._value = newValue
    }
};

newObj.value = 1;
newObj.value = 2;
newObj.value = 3;
newObj.value = 4;
console.log(newObj.oldValues); // [0, 1, 2, 3]