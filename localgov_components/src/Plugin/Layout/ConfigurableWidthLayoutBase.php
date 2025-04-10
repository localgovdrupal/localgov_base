<?php

namespace Drupal\localgov_base\Plugin\Layout;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Layout\LayoutDefault;
use Drupal\Core\Plugin\PluginFormInterface;

/**
 * Base class of layouts with configurable widths.
 */
abstract class ConfigurableWidthLayoutBase extends LayoutDefault implements PluginFormInterface {

  /**
   * Whether the layout has a configurable wrapping HTML element.
   *
   * @var bool
   */
  protected bool $hasConfigurableWrapperElement = FALSE;

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration(): array {
    $configuration = parent::defaultConfiguration();

    $configuration = $configuration + [
      'column_widths' => $this->getDefaultWidth(),
    ];
    if ($this->hasConfigurableWrapperElement) {
      $configuration = $configuration + [
        'element' => $this->getDefaultElement(),
      ];
    }

    return $configuration;
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state): array {
    $form['column_widths'] = [
      '#type' => 'select',
      '#title' => $this->t('Column widths'),
      '#default_value' => $this->configuration['column_widths'],
      '#options' => $this->getWidthOptions(),
      '#description' => $this->t('Choose the column widths for this layout.'),
    ];
    if ($this->hasConfigurableWrapperElement) {
      $form['element'] = [
        '#type' => 'select',
        '#title' => $this->t('Wrapper Element'),
        '#default_value' => $this->configuration['element'],
        '#options' => $this->getElementOptions(),
        '#description' => $this->t('Choose the wrapping HTML element for this layout.'),
      ];
    }
    $build = parent::buildConfigurationForm($form, $form_state);
    // Layout builder uses "Section" as the default label which is unhelpful.
    if (!$build['label']['#default_value']) {
      $build['label']['#default_value'] = $this->pluginDefinition->getLabel();
    }
    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state): void {
    parent::submitConfigurationForm($form, $form_state);
    $this->configuration['column_widths'] = $form_state->getValue('column_widths');
    if ($this->hasConfigurableWrapperElement) {
      $this->configuration['element'] = $form_state->getValue('element');
    }
  }

//  /**
//   * {@inheritdoc}
//   */
//  public function build(array $regions): array {
//    $build = parent::build($regions);
//    $build['#attributes']['class'] = [
//      'layout',
//      $this->getPluginDefinition()->getTemplate(),
//      $this->getPluginDefinition()->getTemplate() . '--' . $this->configuration['column_widths'],
//    ];
//    return $build;
//  }

  /**
   * Gets the width options for the configuration form.
   *
   * The first option will be used as the default 'column_widths' configuration
   * value unless the getDefaultWidth() method is overridden.
   *
   * @return string[]
   *   The width options array where the keys are strings and the values are the
   *   human-readable labels.
   */
  abstract protected function getWidthOptions(): array;

  /**
   * Provides a default value for the width options.
   *
   * @return string
   *   A key from the array returned by ::getWidthOptions().
   */
  protected function getDefaultWidth(): string {
    // Return the first available key from the list of options.
    $keys = array_keys($this->getWidthOptions());
    return array_shift($keys);
  }

  /**
   * Gets the element options for the configuration form.
   *
   * The first option will be used as the default 'element' configuration value
   * unless the getDefaultElement() method is overridden.
   *
   * @return string[]
   *   The element options array where the keys are strings and the values are
   *   the human-readable labels.
   */
  protected function getElementOptions(): array {
    return [
      'section' => '<section>',
      'div' => '<div>',
      'article' => '<article>',
      'aside' => '<aside>',
      'header' => '<header>',
      'footer' => '<footer>',
      '' => 'No wrapping element',
    ];
  }

  /**
   * Provides a default value for the width options.
   *
   * @return string
   *   A key from the array returned by ::getWidthOptions().
   */
  protected function getDefaultElement(): string {
    // Return the first available key from the list of options.
    $keys = array_keys($this->getElementOptions());
    return array_shift($keys);
  }

}
