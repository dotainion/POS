<?php
namespace src\module\permissions\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\infrastructure\SearchRequest;
use src\module\permissions\service\ListPermissionsService;

class ListPermissionsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListPermissionsService();
    }

    public function execute(){
        return $this->service->process(
            new SearchRequest()
        );
    }
}