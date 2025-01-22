<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'gender',
    ];

    public function getCreatedAtAttribute($value) {
        return Carbon::parse($value)->timezone('Asia/Jakarta')->translatedFormat(format:'d F Y H:i:s');
    }

    public function getUpdatedAtAttribute($value) {
        return Carbon::parse($value)->timezone('Asia/Jakarta')->translatedFormat(format:'d F Y H:i:s');
    }

    public static $genders = [
        'Pria',
        'Wanita',
    ];

    public function setGenderAttribute($value)
    {
       if(!in_array($value, self::$genders)) {
           throw new \InvalidArgumentException('Gender must be "Pria" or "Wanita"');
       }

       $this->attributes['gender'] = $value;
    }
}
