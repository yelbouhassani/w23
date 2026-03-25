# Wiskunde Oefentool - Content Structuur

## Overzicht
Deze documentatie beschrijft de exacte structuur waarin de wiskunde oefentool applicatie content verwacht. Deze structuur is cruciaal voor het succesvol vervangen van materiaal.

## Hoofd Arrays/Objecten

### 1. TOPICS Array
```typescript
const TOPICS = [
  { id: "topic_id", label: "Zichtbare naam", points: number },
  // ...meer topics
];
```

**Belangrijke eigenschappen:**
- `id`: Unieke identifier (lowercase, underscores)  
- `label`: Nederlandse display naam voor in de UI
- `points`: Standaard punten voor dit onderwerp

**Huidige topics:**
- taylor (15p), fourier_normal (14p), fourier_complex (14p)
- fourier_transform (16p), inverse_fourier (7p), convolutie (9p)
- filters (5p), laplace (16p), pde (10p), machtreeks (10p), python_fft (7p)

### 2. PREDEFINED Object
```typescript
const PREDEFINED = {
  topic_id: [
    {
      points: number,
      criteria: [
        { label: "Beoordelingscriterium", points: number },
        // ...meer criteria
      ],
      question: String.raw`## Titel
      
      Vraaginhoud met LaTeX: $inline$ en $$display$$
      
      **(a)** Deelvraag 1 (Xp)
      **(b)** Deelvraag 2 (Xp)`,
      
      answer: String.raw`## Oplossing
      
      **(a)** Antwoord deel 1 met $$LaTeX formules$$
      
      **(b)** Antwoord deel 2`
    },
    // ...meer oefeningen voor dit topic
  ],
  // ...meer topics
};
```

## Oefening Structuur Details

### Basis Oefening Object
```typescript
{
  points: number,          // Totaal punten voor deze oefening
  criteria: Array<{        // Beoordelingscriteria (optioneel)
    label: string,         // Beschrijving van criterium
    points: number         // Punten voor dit criterium
  }>,
  question: string,        // Vraag tekst (String.raw template)
  answer: string          // Antwoord tekst (String.raw template)
}
```

### Speciale Formatting

#### LaTeX Wiskunde
- **Inline formules**: `$f(x) = x^2$`
- **Display formules**: `$$f(x) = \frac{x^2}{2}$$`
- **Template strings**: `String.raw` voor correcte escape handling

#### Python Code (python_fft topic)
Voor code fragmenten wordt `<pre>` gebruikt:
```typescript
question: "## Python & FFT – Codevraag A\n\n<pre>a = np.fft.fft(input1d)\noutput = np.fft.ifft(a).real</pre>\n\n(7p) Leg uit wat dit stuk code voor doel heeft."
```

#### Vraag Structuur
```markdown
## Titel van de vraag

Introductie tekst met context

**(a)** Eerste deelvraag (Xp)
**(b)** Tweede deelvraag (Xp)
```

#### Antwoord Structuur
```markdown
## Oplossing

**(a)** Uitwerking deel 1 met $$LaTeX$$

**(b)** Uitwerking deel 2
```

### 3. REFERENCE Object
```typescript
const REFERENCE = {
  topic_id: "Reference style description in English",
  // ...voor alle topics
};
```

## Specifieke Topic Patterns

### Wiskundige Topics (taylor, fourier_normal, etc.)
- Gebruiken `String.raw` templates
- LaTeX formules between `$$...$$`
- Structured criteria met puntverdeling
- Nederlandse vraag/antwoord tekst

### Python FFT Topic
- Korte, compacte objecten zonder uitgebreide criteria structuur
- Code tussen `<pre>` tags
- Conceptuele vragen over code analysis

```typescript
{
  points: 7,
  criteria: [
    { label: "Korte beschrijving", points: number },
    // ...
  ],
  question: "## Python & FFT – Titel\n\n<pre>code hier</pre>\n\n(7p) Vraag text",
  answer: "Korte antwoord text"
}
```

## Belangrijke Opmerkingen

### Template Strings
```typescript
const r = String.raw; // Gebruikt voor LaTeX escape handling
```

### Content Vervangen
1. **Behoud exact dezelfde structuur** voor alle objecten
2. **Topic IDs moeten overeenkomen** tussen TOPICS en PREDEFINED
3. **Criteria punten moeten optellen** naar totaal points
4. **String.raw gebruik** voor wiskundige content
5. **Consistente Nederlandse taal** in questions/answers

### Beoordelingscriteria
Criteria zijn optioneel maar aanbevolen voor complexe vragen:
- Specifieke vaardigheden per onderdeel
- Punten verdeling die optelt naar totaal
- Nederlandse beschrijvingen

## Voorbeeld - Nieuwe Oefening Toevoegen

```typescript
// In TOPICS array - zorg dat het topic al bestaat
{ id: "nieuw_topic", label: "Nieuw Onderwerp", points: 12 }

// In PREDEFINED object
nieuw_topic: [
  {
    points: 12,
    criteria: [
      { label: "Stap 1 correct uitgevoerd", points: 4 },
      { label: "Eindresultaat juist", points: 8 }
    ],
    question: r`## Nieuwe Oefening

    Gegeven functie $f(x) = x^2$.

    **(a)** Doe dit (4p)
    **(b)** En dit (8p)`,
    
    answer: r`## Oplossing

    **(a)** $$\text{Antwoord deel 1}$$

    **(b)** $$\text{Antwoord deel 2}$$`
  }
],

// In REFERENCE object
nieuw_topic: "Reference style description"
```