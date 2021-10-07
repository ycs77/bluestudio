<?php

class Resource
{
    protected $resources = [
        'Blue_Studio_API.json',
        'Blue_Studio_my_projects_API.json',
    ];

    protected $name;

    protected $content;

    public function __construct()
    {
        if (!$queryFilename = $this->getFilenameFromQuery()) {
            return;
        }

        foreach ($this->resources as $path) {
            if ($this->hasResource($path, $queryFilename) &&
                $this->getFile($path)
            ) {
                $this->name = $path;
                break;
            }
        }        
    }

    public function hasResource(string $path, string $queryFilename): bool
    {
        return $path === $queryFilename && in_array($path, $this->resources);
    }

    public function getName()
    {
        return $this->name;
    }

    public function getFile($path): string
    {
        if ($this->name !== $path && $content = file_get_contents($path)) {
            $this->content = $content;
        }

        return $this->content;
    }

    public function getFilenameFromQuery(): ?string
    {
        return $_GET['file'] ?? null;
    }

    public function isMimeType(string $type): bool
    {
        return (bool)preg_match("/.+\.$type/", $this->name);
    }

    public function export()
    {
        header('Access-Control-Allow-Origin: https://cdpn.io');
        header('Access-Control-Allow-Methods: GET');

        if ($this->isMimeType('json')) {
            header('Content-Type: application/json');
        }

        echo $this->content;
    }
}

$resource = new Resource();
$resource->export();
