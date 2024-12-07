<?php

namespace Drupal\localgov_base_test_support\EventSubscriber;

use Drupal\localgov_base_test_support\Plugin\Block\RenderTestBlock;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Adds debug info to the Response headers for testing.
 */
class RenderTestBlockResponseSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      KernelEvents::RESPONSE => 'addRenderTestBlockHeader',
    ];
  }

  /**
   * Adds a response header to indicate if the RenderTestBlock got built.
   */
  public function addRenderTestBlockHeader(ResponseEvent $event): void {
    $headerName = 'X-Render-Test-Block';
    $headerValue = RenderTestBlock::$built ? 'TRUE' : 'FALSE';
    $event->getResponse()->headers->set($headerName, $headerValue);
  }

}
