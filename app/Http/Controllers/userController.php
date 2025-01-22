<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class userController extends Controller
{
    public function importRandomUsers()
    {
        $response = Http::get('https://randomuser.me/api/', [
            'results' => 3
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch random users'], 500);
        }

        $users = $response->json()['results'];

        foreach ($users as $userData) {
            $name = $userData['name']['first'] . ' ' . $userData['name']['last'];
            $gender = $userData['gender'] === 'male' ? 'Pria' : 'Wanita';

            User::create([
                'name' => $name,
                'gender' => $gender
            ]);
        }

        return response()->json(['message' => 'User import Success']);
    }
    
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Pria,Wanita',
        ]);

        $user = User::create($validated);
        return response()->json($user, 201);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'gender' => 'sometimes|in:Pria,Wanita',
        ]);
        $user->update($validated);
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
