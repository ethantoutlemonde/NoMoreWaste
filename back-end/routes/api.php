<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ActivityTypeController;
use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\BeneficiaryAdminController;
use App\Http\Controllers\BeneficiaryController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DocumentAdminController;
use App\Http\Controllers\DocumentTypeController;
use App\Http\Controllers\FoodCollectionController;
use App\Http\Controllers\MessageSupermarketController;
use App\Http\Controllers\OutreachController;
use App\Http\Controllers\PartnerAdminController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\SupermarketAdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupermarketController;
use App\Http\Controllers\SupermarketDisponibilityController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VolunteerAdminController;
use App\Http\Controllers\VolunteerController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\UserMiddleware;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\RecipesController;
use App\Models\FoodAid;
use App\Models\ProductType;
use App\Models\Warehouse;

// ---------------- Auth routes 


Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware('guest')
                ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->middleware('guest')
                ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->middleware('guest')
                ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->middleware('guest')
                ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['auth', 'signed', 'throttle:6,1'])
                ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware(['auth', 'throttle:6,1'])
                ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');


// --------------------------------------------------------------------------------------------------------------

Route::middleware(AdminMiddleware::class)->get('/userAdmin', function (Request $request) {
    return $request->user();
});


Route::middleware(UserMiddleware::class)->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/users', 'UserController@index');

// Users Routes



Route::middleware(AdminMiddleware::class)->resource('admin', AdminController::class);
Route::middleware(AdminMiddleware::class)->resource('beneficiaryAdmin', BeneficiaryAdminController::class);
Route::middleware(AdminMiddleware::class)->resource('volunteerAdmin', VolunteerAdminController::class);
Route::middleware(AdminMiddleware::class)->resource('partnerAdmin', PartnerAdminController::class);
Route::middleware(['auth:sanctum'])->resource('users', UserController::class);
// Route::patch('users/{user}/ban', [UserController::class, 'ban'])->name('users.ban');

// Food Aid Routes

Route::middleware(AdminMiddleware::class)->resource('supermarketAdmin', SupermarketAdminController::class);
Route::middleware(AdminMiddleware::class)->patch('supermarketAdmin/{supermarket}/ban', [SupermarketAdminController::class, 'ban'])->name('supermarkets.ban');
Route::middleware(AdminMiddleware::class)->resource('foodCollectionAdmin', FoodCollectionController::class);
Route::middleware(AdminMiddleware::class)->resource('documentAdmin', DocumentAdminController::class);
Route::middleware(AdminMiddleware::class)->resource('outreachAdmin', OutreachController::class);

// Message Routes
//Route::middleware(AdminMiddleware::class)->resource('messageSupermarket', MessageSupermarketController::class);
Route::get('supermarket/{supermarket}/messages', [MessageSupermarketController::class, 'allMessages'])->name('supermarket.messages');
Route::post('supermarket/{supermarket}/messages', [MessageSupermarketController::class, 'store'])->name('supermarket.messages.store');




// -------------------------------------- Front end routes ----------------------------------------

Route::middleware(UserMiddleware::class)->resource('volunteer', VolunteerController::class);
Route::middleware('guest')->post('/volunteer', [VolunteerController::class, 'store']);
Route::middleware(UserMiddleware::class)->resource('beneficiary', BeneficiaryController::class);
Route::middleware('guest')->post('/beneficiary', [BeneficiaryController::class, 'store']);
Route::middleware(UserMiddleware::class)->resource('partner', PartnerController::class);
Route::middleware('guest')->post('/partner', [PartnerController::class, 'store']);

Route::middleware(UserMiddleware::class)->resource('document', DocumentController::class);
Route::middleware(AdminMiddleware::class)->resource('documentType', DocumentTypeController::class);


Route::middleware(UserMiddleware::class)->get('volunteer/{user}/documents', [VolunteerController::class, 'getVolunteerDocuments']);

Route::middleware(UserMiddleware::class)->resource('supermarket', SupermarketController::class);
// Route::middleware('guest')->post('/supermarket', [SupermarketController::class, 'store']);
Route::middleware(UserMiddleware::class)->get('/supermarket/{supermarket}/disponibilities', [SupermarketController::class, 'disponibilities']);


Route::middleware(UserMiddleware::class)->get('/partner/{partner}/supermarkets', [PartnerController::class, 'mySupermarkets']);

Route::middleware(UserMiddleware::class)->resource('supermarket/disponibility', SupermarketDisponibilityController::class);



Route::middleware(['auth:sanctum'])->resource('supermarket', SupermarketController::class);

Route::middleware(['auth:sanctum'])->resource('foodCollection', FoodCollectionController::class);
Route::middleware(['auth:sanctum'])->post('foodCollection/{foodCollection}/participate', [FoodCollectionController::class, 'participate']);
Route::middleware(['auth:sanctum'])->delete('foodCollection/{foodCollection}/participants', [FoodCollectionController::class, 'deleteParticipation']);
Route::middleware(['auth:sanctum'])->post('foodCollection/{foodCollection}/participants', [FoodCollectionController::class, 'addParticipant']);

Route::middleware(['auth:sanctum'])->resource('outreach', OutreachController::class);
Route::middleware(['auth:sanctum'])->post('outreach/{outreach}/participate', [OutreachController::class, 'participate']);
Route::middleware(['auth:sanctum'])->delete('outreach/{outreach}/participants', [OutreachController::class, 'deleteParticipation']);
Route::middleware(['auth:sanctum'])->post('outreach/{outreach}/participants', [OutreachController::class, 'addParticipant']);
Route::middleware(['auth:sanctum'])->post('outreach/{outreach}/products', [OutreachController::class, 'addProduct']);
Route::middleware(['auth:sanctum'])->get('outreach/{outreach}/products', [OutreachController::class, 'getProducts']);




Route::middleware(['auth:sanctum'])->resource('warehouse', WarehouseController::class);
Route::middleware(['auth:sanctum'])->resource('productType', ProductTypeController::class);
Route::middleware(['auth:sanctum'])->resource('product', ProductController::class);

//smartFridge Routes

Route::middleware(['auth:sanctum'])->resource('recipes', RecipesController::class);
route::middleware(['auth:sanctum'])->get('/recipes/warehouse/{warehouse}', [RecipesController::class, 'getRecipesByWarehouse']);
// Route::middleware(['auth:sanctum'])->post('recipes/suggestMenu', [RecipesController::class, 'suggestMenu']);


//Activity
Route::middleware(['auth:sanctum'])->resource('activity', ActivityController::class);
Route::middleware(['auth:sanctum'])->get('/volunteer/{volunteer}/myActivities', [VolunteerController::class, 'myActivities']);
Route::middleware(['auth:sanctum'])->get('/beneficiary/{beneficiary}/myActivities', [BeneficiaryController::class, 'myActivities']);
Route::middleware(['auth:sanctum'])->get('searchActivities', [ActivityController::class, 'searchActivities']);


Route::middleware(['auth:sanctum'])->post('activity/{activity}/participate', [ActivityController::class, 'participate']);
Route::middleware(['auth:sanctum'])->get('activity/{activity}/participants', [ActivityController::class, 'participants']);
Route::middleware(['auth:sanctum'])->delete('activity/{activity}/participants', [ActivityController::class, 'deleteParticipation']);
Route::middleware(['auth:sanctum'])->delete('activity/{activity}/participate', [ActivityController::class, 'cancelParticipation']);
Route::middleware(['auth:sanctum'])->post('activity/{activity}/participants', [ActivityController::class, 'addParticipant']);


Route::middleware(['auth:sanctum'])->resource('activityType', ActivityTypeController::class);