<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model
{
    protected $table;
    protected $fillable;
    
    protected $primaryKey = "id";
    protected $keyType = "integer";
    public $incrementing = true;
    public $timestamps = true;

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

   
    public function __construct() {
        $this->fillable = array (
            'created_at',
            'updated_at',
            'created_by',
            'updated_by',
        );
    }
    abstract protected function before_create(BaseModel &$doc);
    abstract protected function before_update(BaseModel &$new_doc, BaseModel &$old_doc);

    protected function castToModel( $model, $model_name) {
        $data=json_decode($model[0]);
        $doc = new $model_name ();
        foreach ($data as $key => $value) {
            $doc->$key = $value;
        }
        return $doc;
    }
    public function getfillable(){
        return $this->fillable;
    }
    
}
