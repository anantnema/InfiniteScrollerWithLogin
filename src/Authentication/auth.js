// This is for client side authentication,
// used setTimeout to set some delay to make it look more real.
// fake Async
export default {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}
