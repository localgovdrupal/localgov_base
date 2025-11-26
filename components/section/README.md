## Section classes

These classes are combinable, and should answer all common layout needs.

### `.section`

<details>
  <summary>Contained content and inline padding</summary>
  <pre>

+------------------------------------------------------------------------------+
|P                  A+------------------------------------+A                  P|
|P                  A|                                    |A                  P|
|P                  A|              CONTENT               |A                  P|
|P                  A|                                    |A                  P|
|P                  A+------------------------------------+A                  P|
+------------------------------------------------------------------------------+

  </pre>
</details>

### `.section.section--uncontained`

<details>
  <summary>Inner element has occupies 100% parent width</summary>
  <pre>

+------------------------------------------------------------------------------+
|P+--------------------------------------------------------------------------+P|
|P|                                                                          |P|
|P|                                 CONTENT                                  |P|
|P|                                                                          |P|
|P+--------------------------------------------------------------------------+P|
+------------------------------------------------------------------------------+

  </pre>
</details>

### `.section.section--bleed`

<details>
  <summary>Outer element has no inline padding</summary>
  <pre>

+------------------------------------------------------------------------------+
|                   A+------------------------------------+A                   |
|                   A|                                    |A                   |
|                   A|              CONTENT               |A                   |
|                   A|                                    |A                   |
|                   A+------------------------------------+A                   |
+------------------------------------------------------------------------------+

  </pre>
</details>

### `.section.section--expanded`

<details>
  <summary>Outer element has block padding</summary>
  <pre>

+------------------------------------------------------------------------------+
|PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP|
|P                  A+------------------------------------+A                  P|
|P                  A|                                    |A                  P|
|P                  A|              CONTENT               |A                  P|
|P                  A|                                    |A                  P|
|P                  A+------------------------------------+A                  P|
|PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP|
+------------------------------------------------------------------------------+

  </pre>
</details>

### `.section.section--wrapped`

<details>
  <summary><code>.section .section--wrapped</code></summary>
  <pre>

+------------------------------------------------------------------------------+
|                   A+------------------------------------+A                   |
|                   A|PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP|A                   |
|                   A|P                                  P|A                   |
|                   A|P             CONTENT              P|A                   |
|                   A|P                                  P|A                   |
|                   A|PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP|A                   |
|                   A+------------------------------------+A                   |
+------------------------------------------------------------------------------+

  </pre>
</details>
