import {userReducer} from './user-reducer';

test('user reducer should only increment age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'John'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});
    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should only increment children count', () => {
    const startState = {age: 20, childrenCount: 2, name: 'John'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});

test('user reducer should change name', () => {
    const startState = {age: 20, childrenCount: 2, name: 'John'};
    const newName = 'Dave';
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName});
    expect(endState.name).toBe('Dave');
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(2);
});