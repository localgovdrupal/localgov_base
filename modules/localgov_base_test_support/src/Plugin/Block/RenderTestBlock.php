<?php

namespace Drupal\localgov_base_test_support\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a render test block, used by RegionRenderTest.
 *
 * @Block(
 *   id = "render_test_block",
 *   admin_label = @Translation("Render test block")
 * )
 */
class RenderTestBlock extends BlockBase {

  /**
   * Records if a block of this class has ever been built.
   *
   * This is public so it can be read by RenderTestBlockResponseSubscriber.
   *
   * @var bool
   */
  public static bool $built = FALSE;

  /**
   * {@inheritdoc}
   */
  public function build() {

    self::$built = TRUE;
    return [
      '#markup' => 'This is the output from the render test block.',
    ];
  }

}
