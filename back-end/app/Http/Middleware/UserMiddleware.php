<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated and is not an admin
        if (Auth::check() && (Auth::user()->type === 2 || Auth::user()->type === 3 || Auth::user()->type === 4) && Auth::user()->banned === 0) {
            if (Auth::user()->status !== 'approved') {
                Auth::logout();
                return response()->json(['error' => 'Your account is not approved'], 403);

            }
            return $next($request);
        }

        Auth::logout();

        // Optionally, you can redirect to a different page or return a 403 error
        return response()->json(['message' => 'Unauthorized'], 403);
        // Or return abort(403, 'Unauthorized action.');
    }
}
