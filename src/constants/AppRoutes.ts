const AppRoutes = {
	EditExchange: (id?: string) => `/exchanges/${id ? id : ':id'}/edit`,
	EditWishlist: (id?: string) => `/wishlists/${id ? id : ':id'}/edit`,
	ExchangeDetails: (id?: string) => `/exchanges/${id ? id : ':id'}`,
	Exchanges: () => '/exchanges',
	Home: () => '/',
	Login: () => '/login',
	NewExchange: () => '/exchanges/new',
	NewWishlist: () => '/wishlist/new',
	Register: () => '/register',
	WishlistDetails: (id?: string) => `/wishlists/${id ? id : ':id'}`,
	Wishlists: () => '/wishlists',
}

export default AppRoutes
