import Vue from 'vue';

export const beforeEach = ((route, redirect, next) => {
	next();
});

export const afterEach = (route => {
});
