<?php
namespace src\module\category\service;

use src\infrastructure\Service;
use src\module\category\logic\ListCategories;

class ListCategoriesService extends Service{
    protected ListCategories $categories;

    public function __construct(){
        parent::__construct();
        $this->categories = new ListCategories();
    }
    
    public function process($searchRequest){
        $collector = $this->categories->bySearchRequest($searchRequest);
        $collector->assertHasItem('No category found.');

        $this->setOutput($collector);
        return $this;
    }
}