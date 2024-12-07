<?php

namespace Drupal\localgov_base_test_support\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * A test controller.
 */
class TestController extends ControllerBase {

  /**
   * Returns a render array for a test page.
   */
  public function testPage(): array {
    return [
      '#markup' => $this->t('Hello World!'),
    ];
  }

}
