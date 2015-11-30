<?php
namespace Craft;

class GuanoPlugin extends BasePlugin
{

	public function init()
	{
		parent::init();
		if (craft()->request->isCpRequest()) {
			$this->_guanoNow();
		}
	}

	public function getName()
	{
		return Craft::t('Guano');
	}

	public function getVersion()
	{
		return '0.2';
	}

	public function getDeveloper()
	{
		return 'André Elvan';
	}

	public function getDeveloperUrl()
	{
		return 'https://github.com/aelvan/craft-guano';
	}
  
	private function _guanoNow()
	{
		craft()->templates->includeJs('var langStrSaveAndContinue = "' . Craft::t('Save and continue editing') . '", langStrSave = "' . Craft::t('Save') . '";');
		craft()->templates->includeCssResource('guano/css/guano.css');
		craft()->templates->includeJsResource('guano/js/guano.js');
	}
	
}
