import {createStore} from "redux";

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

const initialStateCustomer = {
	fullName: "",
	nationalID: "",
	createdAt: "",
};

function AccountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/deposit":
			return {...state, balance: state.balance + action.payload};
		case "account/withdrawal":
			return {...state, balance: state.balance - action.payload};
		case "account/requestLoan":
			if (state.loan > 0) return state;
			return {
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};
		case "account/payLoan":
			return {...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan};
		default:
			return state;
	}
}

function customerReducer(state = initialStateCustomer, action) {
	switch (action.type) {
		case "customer/createCustomer":
			return {
				...state,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};
		case "customer/updateName":
			return {...state, fullName: action.payload};
		default:
			return state;
	}
}

// Action Creator functions:
function deposit(amount) {
	return {type: "account/deposit", payload: amount};
}

function withdrawal(amount) {
	return {type: "account/withdrawal", payload: amount};
}

function requestLoan(amount, purpose) {
	return {type: "account/requestLoan", payload: {amount: amount, purpose: purpose}};
}

function payLoan() {
	return {type: "account/payLoan"};
}

const store = createStore(reducer);
store.dispatch(deposit(500));

console.log(store.getState());
store.dispatch(withdrawal(200));

console.log(store.getState());
store.dispatch(requestLoan(2000, "Buy a macbook"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());
