<?php

namespace Drupal\Tests\block_content\Functional;

use Drupal\Tests\BrowserTestBase;

/**
 * Tests the code in localgov_base_preprocess_page() that renders regions.
 *
 * @group localgov_base
 */
class RegionRenderTest extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'localgov_base_test_support',
  ];

  /**
   * {@inheritdoc}
   */
  protected $profile = 'localgov';

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'localgov_base';

  /**
   * Data provider for ::testRegionRender().
   */
  public static function blockRegionProvider(): array {
    return [
      [
        'region' => 'disabled',
        'rendered' => 'FALSE',
      ],
      [
        'region' => 'sidebar_first',
        'rendered' => 'TRUE',
      ],
    ];
  }

  /**
   * Tests that blocks in regions that aren't printed don't get rendered.
   *
   * To do this, we place a block provided by the localgov_base_test_support
   * module into one of the regions. We then load a page, which is a callback
   * provided by a controller in the same module, that will always load, and
   * show blocks. Our block class records if an instance of it was built when
   * the page loads. The module registers an event listener to add if the block
   * was rendered to the response headers.
   *
   * We do all this because the page render runs in a different process to this
   * test, so we can't just read the value from the class directly.
   *
   * @dataProvider blockRegionProvider
   */
  public function testRegionRender($region, $rendered): void {
    $this->drupalPlaceBlock('render_test_block', [
      'region' => $region,
    ]);
    $this->drupalGet('/test-page');
    $this->assertSession()->responseHeaderContains('X-Render-Test-Block', $rendered);
  }

}
