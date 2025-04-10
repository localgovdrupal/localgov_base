<?php

namespace Drupal\localgov_base\Plugin\Layout;

/**
 * Configurable three column layout plugin class.
 *
 * @internal
 *   Plugin classes are internal.
 */
class ContainerLayout extends ConfigurableWidthLayoutBase {

  /**
   * {@inheritdoc}
   */
  protected bool $hasConfigurableWrapperElement = TRUE;

  /**
   * {@inheritdoc}
   */
  protected function getWidthOptions(): array {
    return [
      'default' => 'Default width (extra-large)',
      'restricted' => 'Restricted width (medium)',
      'mega' => 'Mega (1440px)',
      'extra-large' => 'Extra-large (1180px)',
      'large' => 'Large (960px)',
      'medium' => 'Medium (768px)',
      'small' => 'Small (480px)',
    ];
  }

}
