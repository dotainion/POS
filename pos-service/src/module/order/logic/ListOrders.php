<?php
namespace src\module\order\logic;

use src\infrastructure\Collector;
use src\module\order\repository\OrderRepository;

class ListOrders{
    protected OrderRepository $repo;

    public function __construct(){
        $this->repo = new OrderRepository();
    }

    public function listActive():Collector{
        return $this->repo->listOrders([
            'completed' => false,
            'canceled' => false
        ]);
    }

    public function listActiveByCustomerIdArray(array $customerIdArray):Collector{
        if(empty($customerIdArray)){
            return new Collector();
        }
        return $this->repo->listOrders([
            'customerId' => $customerIdArray,
            'completed' => false,
            'canceled' => false
        ]);
    }
}