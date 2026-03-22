import { useState, useEffect, useRef, useCallback } from "react";

const TOPICS = [
  { id: "taylor",            label: "Taylorreeksen",                points: 15 },
  { id: "fourier_normal",    label: "Gewone Fourierreeks",          points: 14 },
  { id: "fourier_complex",   label: "Complexe Fourierreeks",        points: 14 },
  { id: "fourier_transform", label: "Fouriertransformatie",         points: 16 },
  { id: "inverse_fourier",   label: "Inverse Fouriertransformatie", points:  7 },
  { id: "convolutie",        label: "Convolutie",                   points:  9 },
  { id: "filters",           label: "Filters",                      points:  5 },
  { id: "laplace",           label: "Laplacetransformatie",         points: 16 },
  { id: "pde",               label: "PDV's oplossen",               points: 10 },
  { id: "machtreeks",        label: "Machtreeksen / GDV",           points: 10 },
  { id: "python_fft",        label: "Python & FFT",                 points:  7 },
];

const r = String.raw;

const PREDEFINED = {
  taylor: [
    {
      points: 15,
      criteria: [
        { label: "Bekende reeks van sin(u) correct opschrijven", points: 3 },
        { label: "Substitutie u = x² correct uitvoeren", points: 4 },
        { label: "Stoppen bij de juiste term x⁶", points: 3 },
        { label: "Integratie term voor term correct", points: 5 },
      ],
      question: r`## Taylorreeks van $f(x) = \sin(x^2)$

Beschouw de functie $f(x) = \sin(x^2)$.

**(a)** Leid de Taylorreeks af van $f(x)$ rond $x = 0$ tot en met de term met $x^6$ door substitutie in de bekende reeks van $\sin(u)$. (10p)

**(b)** Bereken $\displaystyle\int \sin(x^2)\,dx$ als een machtreeks in $x$. (5p)`,
      answer: r`## Oplossing

**(a)** Schrijf eerst de bekende Taylorreeks van $\sin(u)$ op:

$$\sin(u) = u - \frac{u^3}{3!} + \frac{u^5}{5!} - \cdots = u - \frac{u^3}{6} + \frac{u^{5}}{120} - \cdots$$

Vervang vervolgens $u$ door $x^2$:

$$\sin(x^2) = x^2 - \frac{(x^2)^3}{6} + \frac{(x^2)^5}{120} - \cdots = x^2 - \frac{x^6}{6} + \frac{x^{10}}{120} - \cdots$$

Omdat de opgave vraagt om te stoppen bij $x^6$:

$$\sin(x^2) \approx x^2 - \frac{x^6}{6}$$

**(b)** Integreer term voor term:

$$\int x^2\,dx = \frac{x^3}{3}, \qquad \int \frac{x^6}{6}\,dx = \frac{x^7}{42}$$

$$\int \sin(x^2)\,dx \approx \frac{x^3}{3} - \frac{x^7}{42} + C$$`,
    },
    {
      points: 15,
      criteria: [
        { label: "Bekende reeks van cos(u) correct opschrijven", points: 3 },
        { label: "Substitutie u = x² correct uitvoeren", points: 4 },
        { label: "Stoppen bij de juiste term x⁶", points: 3 },
        { label: "Integratie term voor term correct", points: 5 },
      ],
      question: r`## Taylorreeks van $f(x) = \cos(x^2)$

Beschouw de functie $f(x) = \cos(x^2)$.

**(a)** Leid de Taylorreeks af van $f(x)$ rond $x = 0$ tot en met de term met $x^6$ door substitutie in de bekende reeks van $\cos(u)$. (10p)

**(b)** Bereken $\displaystyle\int \cos(x^2)\,dx$ als een machtreeks in $x$. (5p)`,
      answer: r`## Oplossing

**(a)** Schrijf de bekende Taylorreeks van $\cos(u)$:

$$\cos(u) = 1 - \frac{u^2}{2} + \frac{u^4}{24} - \cdots$$

Vervang $u$ door $x^2$:

$$\cos(x^2) = 1 - \frac{x^4}{2} + \frac{x^8}{24} - \cdots \approx 1 - \frac{x^4}{2}$$

**(b)** Integreer term voor term:

$$\int \cos(x^2)\,dx \approx x - \frac{x^5}{10} + C$$`,
    },
    {
      points: 15,
      criteria: [
        { label: "Bekende reeks van eᵘ correct opschrijven", points: 3 },
        { label: "Substitutie u = −x correct uitvoeren", points: 3 },
        { label: "Vermenigvuldigen met x correct", points: 4 },
        { label: "Integratie term voor term correct", points: 5 },
      ],
      question: r`## Taylorreeks van $f(x) = x \cdot e^{-x}$

Beschouw de functie $f(x) = x \cdot e^{-x}$.

**(a)** Leid de Taylorreeks af van $f(x)$ rond $x = 0$ tot en met de term met $x^4$. (10p)

**(b)** Bereken $\displaystyle\int x\,e^{-x}\,dx$ als een machtreeks in $x$. (5p)`,
      answer: r`## Oplossing

**(a)** Vervang $u$ door $-x$ in $e^u$:

$$e^{-x} = 1 - x + \frac{x^2}{2} - \frac{x^3}{6} + \cdots$$

Vermenigvuldig met $x$:

$$x\,e^{-x} = x - x^2 + \frac{x^3}{2} - \frac{x^4}{6} + \cdots$$

**(b)**

$$\int x\,e^{-x}\,dx \approx \frac{x^2}{2} - \frac{x^3}{3} + \frac{x^4}{8} - \frac{x^5}{30} + C$$`,
    },
    {
      points: 15,
      criteria: [
        { label: "Bekende reeks van ln(1+u) correct opschrijven", points: 3 },
        { label: "Substitutie u = x² correct uitvoeren", points: 4 },
        { label: "Stoppen bij de juiste term x⁶", points: 3 },
        { label: "Integratie term voor term correct", points: 5 },
      ],
      question: r`## Taylorreeks van $f(x) = \ln(1 + x^2)$

Beschouw de functie $f(x) = \ln(1 + x^2)$.

**(a)** Leid de Taylorreeks af van $f(x)$ rond $x = 0$ tot en met de term met $x^6$. (10p)

**(b)** Bereken $\displaystyle\int \ln(1+x^2)\,dx$ als een machtreeks in $x$. (5p)`,
      answer: r`## Oplossing

**(a)**

$$\ln(1+x^2) = x^2 - \frac{x^4}{2} + \frac{x^6}{3} - \cdots$$

**(b)**

$$\int \ln(1+x^2)\,dx \approx \frac{x^3}{3} - \frac{x^5}{10} + \frac{x^7}{21} + C$$`,
    },
    {
      points: 15,
      criteria: [
        { label: "Afgeleiden f', f'', f''', f⁽⁴⁾ correct bepalen", points: 4 },
        { label: "Evaluatie in x = 0 correct", points: 3 },
        { label: "Taylorformule correct invullen", points: 3 },
        { label: "Integratie term voor term correct", points: 5 },
      ],
      question: r`## Taylorreeks van $f(x) = \sqrt{1 + x^2}$

Beschouw de functie $f(x) = \sqrt{1 + x^2}$.

**(a)** Leid de Taylorreeks af van $f(x)$ rond $x = 0$ tot en met de term met $x^4$ door herhaaldelijk te differentiëren. (10p)

**(b)** Bereken $\displaystyle\int \sqrt{1+x^2}\,dx$ als een machtreeks in $x$. (5p)`,
      answer: r`## Oplossing

**(a)**

$$\sqrt{1+x^2} \approx 1 + \frac{x^2}{2} - \frac{x^4}{8} + \cdots$$

**(b)**

$$\int \sqrt{1+x^2}\,dx \approx x + \frac{x^3}{6} - \frac{x^5}{40} + C$$`,
    },
    {
      points: 15,
      criteria: [
        { label: "Bekende reeks van eᵘ correct opschrijven", points: 3 },
        { label: "Substitutie u = −x² correct uitvoeren", points: 4 },
        { label: "Stoppen bij de juiste term x⁶", points: 3 },
        { label: "Integratie term voor term correct", points: 5 },
      ],
      question: r`## Taylorreeks van $f(x) = e^{-x^2}$

Beschouw de functie $f(x) = e^{-x^2}$.

**(a)** Leid de Taylorreeks af van $f(x)$ rond $x = 0$ tot en met de term met $x^6$ door substitutie in de bekende reeks van $e^u$. (10p)

**(b)** Bereken $\displaystyle\int e^{-x^2}\,dx$ als een machtreeks in $x$. (5p)`,
      answer: r`## Oplossing

**(a)**

$$e^{-x^2} = 1 - x^2 + \frac{x^4}{2} - \frac{x^6}{6} + \cdots$$

**(b)**

$$\int e^{-x^2}\,dx \approx x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + C$$`,
    },
    {
      points: 15,
      criteria: [
        { label: "Bekende meetkundige reeks correct opschrijven", points: 3 },
        { label: "Substitutie u = x² correct uitvoeren", points: 4 },
        { label: "Stoppen bij de juiste term x⁶", points: 3 },
        { label: "Integratie term voor term correct", points: 5 },
      ],
      question: r`## Taylorreeks van $f(x) = \dfrac{1}{1+x^2}$

Beschouw de functie $f(x) = \dfrac{1}{1+x^2}$.

**(a)** Leid de Taylorreeks af van $f(x)$ rond $x = 0$ tot en met de term met $x^6$. (10p)

**(b)** Bereken $\displaystyle\int \frac{1}{1+x^2}\,dx$ als een machtreeks in $x$. (5p)`,
      answer: r`## Oplossing

**(a)**

$$\frac{1}{1+x^2} = 1 - x^2 + x^4 - x^6 + \cdots$$

**(b)**

$$\int \frac{1}{1+x^2}\,dx \approx x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + C$$`,
    },
    {
      points: 15,
      criteria: [
        { label: "Verdubbelingsformule sin(x)cos(x) = ½sin(2x) correct toepassen", points: 3 },
        { label: "Substitutie u = 2x in sin(u) correct uitvoeren", points: 4 },
        { label: "Vermenigvuldigen met ½ en stoppen bij x⁵ correct", points: 3 },
        { label: "Integratie term voor term correct", points: 5 },
      ],
      question: r`## Taylorreeks van $f(x) = \sin(x)\cos(x)$

Beschouw de functie $f(x) = \sin(x)\cos(x)$.

**(a)** Leid de Taylorreeks af van $f(x)$ rond $x = 0$ tot en met de term met $x^5$. (10p)

**(b)** Bereken $\displaystyle\int \sin(x)\cos(x)\,dx$ als een machtreeks in $x$. (5p)`,
      answer: r`## Oplossing

**(a)**

$$\sin(x)\cos(x) = x - \frac{2x^3}{3} + \frac{2x^5}{15} - \cdots$$

**(b)**

$$\int \sin(x)\cos(x)\,dx \approx \frac{x^2}{2} - \frac{x^4}{6} + \frac{x^6}{45} + C$$`,
    },
  ],

  fourier_normal: [
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen en conclusie voor bₙ", points: 2 },
        { label: "a₀ correct berekend via symmetrie", points: 3 },
        { label: "Eerste partiële integratie correct", points: 2 },
        { label: "Tweede partiële integratie correct", points: 2 },
        { label: "Eindresultaat aₙ correct", points: 3 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Fourierreeks van $f(x) = x^2$

Gegeven de functie $f(x) = x^2$ op het interval $[-\pi, \pi]$ met periode $T = 2\pi$.

**(a)** Bepaal of $f(x)$ even, oneven of geen van beide is en geef aan welke coëfficiënten daardoor nul zijn. (2p)

**(b)** Bereken de constante term $a_0$. (4p)

**(c)** Bereken de coëfficiënten $a_n$. (6p)

**(d)** Schrijf de volledige Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** $f(-x) = x^2 = f(x)$: **even**, dus $b_n = 0$.

**(b)**

$$a_0 = \frac{2}{\pi}\int_0^{\pi}x^2\,dx = \frac{2\pi^2}{3}$$

Constante term: $\frac{a_0}{2} = \frac{\pi^2}{3}$.

**(c)** Via tweemaal partiële integratie:

$$a_n = \frac{4(-1)^n}{n^2}$$

**(d)**

$$f(x) = \frac{\pi^2}{3} + \sum_{n=1}^{\infty}\frac{4(-1)^n}{n^2}\cos(nx)$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen", points: 2 },
        { label: "a₀ correct berekend", points: 3 },
        { label: "aₙ = 0 correct beredeneerd", points: 2 },
        { label: "Partiële integratie voor bₙ correct", points: 4 },
        { label: "Fourierreeks correct opgeschreven", points: 3 },
      ],
      question: r`## Fourierreeks van $f(x) = -x + 1$

Gegeven de functie $f(x) = -x + 1$ op het interval $[-\pi, \pi]$ met periode $T = 2\pi$.

**(a)** Bepaal of $f(x)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken de constante term $a_0$. (4p)

**(c)** Bereken de coëfficiënten $a_n$ en $b_n$. (6p)

**(d)** Schrijf de volledige Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Noch even noch oneven.

**(b)** $a_0 = 2$, constante term $= 1$.

**(c)** $a_n = 0$, $b_n = \frac{2(-1)^{n+1}}{n}$.

**(d)**

$$f(x) = 1 + \sum_{n=1}^{\infty}\frac{2(-1)^{n+1}}{n}\sin(nx)$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen en conclusie voor bₙ", points: 2 },
        { label: "a₀ correct berekend", points: 3 },
        { label: "Partiële integratie voor aₙ correct", points: 5 },
        { label: "Eindresultaat aₙ correct", points: 2 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Fourierreeks van $f(x) = |x|$

Gegeven de functie $f(x) = |x|$ op het interval $[-2, 2]$ met periode $T = 4$.

**(a)** Bepaal of $f(x)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken de constante term $a_0$. (4p)

**(c)** Bereken de coëfficiënten $a_n$. (6p)

**(d)** Schrijf de volledige Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Even, dus $b_n = 0$.

**(b)** $\frac{a_0}{2} = 1$.

**(c)**

$$a_n = \frac{4((-1)^n-1)}{n^2\pi^2}$$

**(d)**

$$f(x) = 1 + \sum_{n=1}^{\infty}\frac{4((-1)^n-1)}{n^2\pi^2}\cos\!\left(\frac{n\pi x}{2}\right)$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen", points: 2 },
        { label: "a₀ correct berekend", points: 3 },
        { label: "aₙ correct berekend via partiële integratie", points: 4 },
        { label: "bₙ correct berekend via partiële integratie", points: 3 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Fourierreeks van een stuksgewijze functie

Gegeven de stuksgewijze functie op $[-1, 1]$ met periode $T = 2$:

$$f(x) = \begin{cases} 0 & -1 \leq x < 0 \\ x & 0 \leq x \leq 1 \end{cases}$$

**(a)** Bepaal of $f(x)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken de constante term $a_0$. (4p)

**(c)** Bereken de coëfficiënten $a_n$ en $b_n$. (6p)

**(d)** Schrijf de volledige Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Noch even noch oneven.

**(b)** $\frac{a_0}{2} = \frac{1}{4}$.

**(c)** $a_n = \frac{(-1)^n-1}{n^2\pi^2}$, $b_n = \frac{(-1)^{n+1}}{n\pi}$.

**(d)**

$$f(x) = \frac{1}{4} + \sum_{n=1}^{\infty}\left[\frac{(-1)^n-1}{n^2\pi^2}\cos(n\pi x) + \frac{(-1)^{n+1}}{n\pi}\sin(n\pi x)\right]$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen", points: 2 },
        { label: "a₀ correct berekend", points: 3 },
        { label: "bₙ = 0 correct beredeneerd via symmetrie", points: 2 },
        { label: "aₙ correct berekend via partiële integratie", points: 5 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Fourierreeks van $f(x) = x(2\pi - x)$

Gegeven de functie $f(x) = x(2\pi - x)$ op het interval $[0, 2\pi]$ met periode $T = 2\pi$.

**(a)** Bepaal of $f(x)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken de constante term $a_0$. (4p)

**(c)** Bereken de coëfficiënten $a_n$ en $b_n$. (6p)

**(d)** Schrijf de volledige Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Noch even noch oneven; $b_n = 0$ door spiegelsymmetrie.

**(b)** $\frac{a_0}{2} = \frac{2\pi^2}{3}$.

**(c)** $b_n = 0$, $a_n = -\frac{4}{n^2}$.

**(d)**

$$f(x) = \frac{2\pi^2}{3} - \sum_{n=1}^{\infty}\frac{4}{n^2}\cos(nx)$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen en conclusie voor a₀, aₙ", points: 2 },
        { label: "Eerste partiële integratie correct", points: 3 },
        { label: "Tweede partiële integratie correct", points: 3 },
        { label: "Derde partiële integratie correct", points: 4 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Fourierreeks van $f(x) = x^3$

Gegeven de functie $f(x) = x^3$ op het interval $[-\pi, \pi]$ met periode $T = 2\pi$.

**(a)** Bepaal of $f(x)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken de coëfficiënten $b_n$ via drievoudige partiële integratie. (10p)

**(c)** Schrijf de volledige Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Oneven: $a_0 = a_n = 0$.

**(b)**

$$b_n = 2(-1)^{n+1}\!\left(\frac{\pi^2}{n} - \frac{6}{n^3}\right)$$

**(c)**

$$f(x) = \sum_{n=1}^{\infty}2(-1)^{n+1}\!\left(\frac{\pi^2}{n} - \frac{6}{n^3}\right)\sin(nx)$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen en conclusie", points: 2 },
        { label: "a₀ = 0 correct beredeneerd", points: 2 },
        { label: "bₙ correct berekend via symmetrie en integratie", points: 6 },
        { label: "Onderscheid even/oneven n correct gemaakt", points: 2 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Fourierreeks van een blokgolf

Gegeven de stuksgewijze functie op $[-\pi, \pi]$ met periode $T = 2\pi$:

$$f(x) = \begin{cases} -1 & -\pi \leq x < 0 \\ 1 & 0 \leq x < \pi \end{cases}$$

**(a)** Bepaal of $f(x)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $a_0$ en $b_n$. (10p)

**(c)** Schrijf de volledige Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Oneven: $a_0 = a_n = 0$.

**(b)** $b_n = \frac{2(1-(-1)^n)}{n\pi}$.

**(c)**

$$f(x) = \frac{4}{\pi}\sum_{k=0}^{\infty}\frac{\sin((2k+1)x)}{2k+1}$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen", points: 2 },
        { label: "a₀ correct berekend", points: 3 },
        { label: "aₙ correct berekend via tweemaal partiële integratie", points: 4 },
        { label: "bₙ correct berekend", points: 3 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Fourierreeks van $f(x) = e^x$

Gegeven de functie $f(x) = e^x$ op het interval $[-\pi, \pi]$ met periode $T = 2\pi$.

**(a)** Bepaal of $f(x)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $a_0$, $a_n$ en $b_n$. (10p)

**(c)** Schrijf de volledige Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Noch even noch oneven.

**(b)**

$$a_0 = \frac{2\sinh(\pi)}{\pi},\quad a_n = \frac{2(-1)^n\sinh(\pi)}{\pi(1+n^2)},\quad b_n = \frac{-2n(-1)^n\sinh(\pi)}{\pi(1+n^2)}$$

**(c)**

$$f(x) = \frac{\sinh(\pi)}{\pi}\left(1 + \sum_{n=1}^{\infty}\frac{2(-1)^n}{1+n^2}\bigl[\cos(nx) - n\sin(nx)\bigr]\right)$$`,
    },
  ],

  fourier_complex: [
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen", points: 2 },
        { label: "c₀ correct berekend via definitie", points: 3 },
        { label: "Integratie voor cₙ correct opgezet", points: 3 },
        { label: "Gebruik van e^{±iπn} = (−1)ⁿ correct", points: 2 },
        { label: "Eindresultaat cₙ correct", points: 2 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Complexe Fourierreeks van $f(t) = e^{t}$

Gegeven de functie $f(t) = e^{t}$ op het interval $[-1, 1]$ met periode $T = 2$.

**(a)** Controleer of $f(t)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $c_0$. (4p)

**(c)** Bereken $c_n$ voor $n \neq 0$. (6p)

**(d)** Schrijf de volledige complexe Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Noch even noch oneven.

**(b)** $c_0 = \sinh(1)$.

**(c)**

$$c_n = \frac{(-1)^n\sinh(1)}{1-i\pi n}$$

**(d)**

$$f(t) = \sum_{n=-\infty}^{\infty}\frac{(-1)^n\sinh(1)}{1-i\pi n}\,e^{i\pi nt}$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen", points: 2 },
        { label: "c₀ correct berekend", points: 3 },
        { label: "Integratie voor cₙ correct opgezet", points: 3 },
        { label: "Gebruik van e^{−2πin} = 1 correct", points: 2 },
        { label: "Eindresultaat cₙ correct", points: 2 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Complexe Fourierreeks van $f(t) = e^{-2t}$

Gegeven de functie $f(t) = e^{-2t}$ op het interval $[0, 1]$ met periode $T = 1$.

**(a)** Controleer of $f(t)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $c_0$. (4p)

**(c)** Bereken $c_n$ voor $n \neq 0$. (6p)

**(d)** Schrijf de volledige complexe Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Noch even noch oneven.

**(b)** $c_0 = \frac{1-e^{-2}}{2}$.

**(c)**

$$c_n = \frac{1-e^{-2}}{2+2\pi in}$$

**(d)**

$$f(t) = \sum_{n=-\infty}^{\infty}\frac{1-e^{-2}}{2+2\pi in}\,e^{2\pi int}$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen en implicatie voor c₀", points: 2 },
        { label: "c₀ = 0 correct berekend", points: 2 },
        { label: "Integraal correct gesplitst in twee delen", points: 3 },
        { label: "Gebruik van e^{−iπn} = (−1)ⁿ correct", points: 3 },
        { label: "Eindresultaat cₙ correct", points: 2 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Complexe Fourierreeks van een blokvormige functie

Gegeven de stuksgewijze functie op $[-1, 1]$ met periode $T = 2$:

$$f(t) = \begin{cases} -1 & -1 \leq t < 0 \\ 1 & 0 \leq t < 1 \end{cases}$$

**(a)** Bepaal of $f(t)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $c_0$. (4p)

**(c)** Bereken $c_n$ voor $n \neq 0$. (6p)

**(d)** Schrijf de volledige complexe Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Oneven: $c_0 = 0$.

**(b)** $c_0 = 0$.

**(c)**

$$c_n = \frac{i((-1)^n-1)}{n\pi}$$

**(d)**

$$f(t) = \sum_{\substack{n\neq0}}\frac{i((-1)^n-1)}{n\pi}\,e^{i\pi nt}$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen en implicatie voor c₀", points: 2 },
        { label: "c₀ = 0 correct beredeneerd", points: 2 },
        { label: "Partiële integratie correct opgezet", points: 4 },
        { label: "Randterm correct geëvalueerd", points: 2 },
        { label: "Eindresultaat cₙ correct", points: 2 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Complexe Fourierreeks van $f(t) = t$

Gegeven de functie $f(t) = t$ op het interval $[-\pi, \pi]$ met periode $T = 2\pi$.

**(a)** Bepaal of $f(t)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $c_0$. (4p)

**(c)** Bereken $c_n$ voor $n \neq 0$. (6p)

**(d)** Schrijf de volledige complexe Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Oneven: $c_0 = 0$.

**(b)** $c_0 = 0$.

**(c)** $c_n = \frac{i(-1)^n}{n}$.

**(d)**

$$f(t) = \sum_{\substack{n\neq0}}\frac{i(-1)^n}{n}\,e^{int}$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen en implicaties", points: 2 },
        { label: "c₀ correct berekend via symmetrie", points: 3 },
        { label: "Partiële integratie correct opgezet", points: 4 },
        { label: "Eindresultaat cₙ correct", points: 3 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Complexe Fourierreeks van $f(t) = |t|$

Gegeven de functie $f(t) = |t|$ op het interval $[-2, 2]$ met periode $T = 4$.

**(a)** Bepaal of $f(t)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $c_0$. (4p)

**(c)** Bereken $c_n$ voor $n \neq 0$. (6p)

**(d)** Schrijf de volledige complexe Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Even: $c_n$ reëel, $c_{-n} = c_n$.

**(b)** $c_0 = 1$.

**(c)**

$$c_n = \frac{2((-1)^n-1)}{n^2\pi^2}$$

**(d)**

$$f(t) = 1 + \sum_{\substack{n\neq0}}\frac{2((-1)^n-1)}{n^2\pi^2}\,e^{i\frac{\pi n}{2}t}$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen", points: 2 },
        { label: "c₀ = 0 correct beredeneerd", points: 2 },
        { label: "Schrijven als som van complexe exponenten correct", points: 4 },
        { label: "c₂ = c₋₂ = ½ correct geïdentificeerd", points: 4 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Complexe Fourierreeks van $f(t) = \cos(2\pi t)$

Gegeven de functie $f(t) = \cos(2\pi t)$ op het interval $[-1, 1]$ met periode $T = 2$.

**(a)** Controleer of $f(t)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $c_0$. (4p)

**(c)** Bereken $c_n$ voor $n \neq 0$. (6p)

**(d)** Schrijf de volledige complexe Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Even.

**(b)** $c_0 = 0$.

**(c)** $c_2 = c_{-2} = \frac{1}{2}$, alle andere $c_n = 0$.

**(d)**

$$f(t) = \frac{1}{2}e^{2\pi it} + \frac{1}{2}e^{-2\pi it}$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen en implicaties voor cₙ", points: 2 },
        { label: "c₀ correct berekend", points: 3 },
        { label: "Eerste partiële integratie correct", points: 3 },
        { label: "Tweede partiële integratie correct", points: 3 },
        { label: "Fourierreeks correct opgeschreven", points: 3 },
      ],
      question: r`## Complexe Fourierreeks van $f(t) = t^2$

Gegeven de functie $f(t) = t^2$ op het interval $[-1, 1]$ met periode $T = 2$.

**(a)** Bepaal of $f(t)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $c_0$. (4p)

**(c)** Bereken $c_n$ voor $n \neq 0$. (6p)

**(d)** Schrijf de volledige complexe Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Even: $c_n$ reëel, $c_{-n} = c_n$.

**(b)** $c_0 = \frac{1}{3}$.

**(c)**

$$c_n = \frac{(-1)^n}{n^2\pi^2}$$

**(d)**

$$f(t) = \frac{1}{3} + \sum_{\substack{n\neq0}}\frac{(-1)^n}{n^2\pi^2}\,e^{in\pi t}$$`,
    },
    {
      points: 14,
      criteria: [
        { label: "Even/oneven correct bepalen", points: 2 },
        { label: "c₀ correct berekend", points: 3 },
        { label: "Partiële integratie correct opgezet", points: 4 },
        { label: "Gebruik van e^{−2πin} = 1 correct", points: 2 },
        { label: "Eindresultaat cₙ correct", points: 1 },
        { label: "Fourierreeks correct opgeschreven", points: 2 },
      ],
      question: r`## Complexe Fourierreeks van een zaagtandgolf

Gegeven de functie $f(t) = t$ op het interval $[0, 1]$ met periode $T = 1$.

**(a)** Controleer of $f(t)$ even, oneven of geen van beide is. (2p)

**(b)** Bereken $c_0$. (4p)

**(c)** Bereken $c_n$ voor $n \neq 0$. (6p)

**(d)** Schrijf de volledige complexe Fourierreeks op. (2p)`,
      answer: r`## Oplossing

**(a)** Noch even noch oneven.

**(b)** $c_0 = \frac{1}{2}$.

**(c)** $c_n = \frac{i}{2\pi n}$.

**(d)**

$$f(t) = \frac{1}{2} + \sum_{\substack{n\neq0}}\frac{i}{2\pi n}\,e^{2\pi int}$$`,
    },
  ],

  fourier_transform: [
    {
      points: 16,
      criteria: [
        { label: "Integraal correct gesplitst bij t = 0", points: 2 },
        { label: "Eerste deel (t < 0) correct berekend", points: 3 },
        { label: "Tweede deel (t ≥ 0) correct berekend", points: 3 },
        { label: "Optelling tot eindresultaat correct", points: 2 },
        { label: "Correcte interpretatie van |f̂(ω)| als Lorentziaan", points: 2 },
        { label: "Fysische interpretatie van breedte spectrum correct", points: 2 },
        { label: "Eindresultaat correct opgeschreven", points: 2 },
      ],
      question: r`## Fouriertransformatie van $f(t) = e^{-|t|}$

Bereken de Fouriertransformatie van $f(t) = e^{-|t|}$.

**(a)** Splits het integraal op in $t < 0$ en $t \geq 0$ en bereken $\hat{f}(\omega)$. (12p)

**(b)** Geef een fysische interpretatie van $|\hat{f}(\omega)|$. (4p)`,
      answer: r`## Oplossing

**(a)**

$$\hat{f}(\omega) = \frac{1}{1-i\omega} + \frac{1}{1+i\omega} = \frac{2}{1+\omega^2}$$

**(b)** Lorentziaan, maximum bij $\omega=0$, afname als $1/\omega^2$.`,
    },
    {
      points: 16,
      criteria: [
        { label: "Integraal correct opgezet (ondergrens 0)", points: 3 },
        { label: "Exponentiaal correct geïntegreerd", points: 4 },
        { label: "Convergentieargument correct", points: 2 },
        { label: "Eindresultaat f̂(ω) correct", points: 3 },
        { label: "|f̂(ω)| correct berekend en beschreven als laagdoorlaat", points: 4 },
      ],
      question: r`## Fouriertransformatie van een eenzijdige exponentiaal

Bereken de Fouriertransformatie van $f(t) = e^{-3t}u(t)$.

**(a)** Bereken $\hat{f}(\omega)$ via de definitie. (12p)

**(b)** Geef een fysische interpretatie van $|\hat{f}(\omega)|$. (4p)`,
      answer: r`## Oplossing

**(a)**

$$\hat{f}(\omega) = \frac{1}{3+i\omega}$$

**(b)** Laagdoorlaat: $|\hat{f}(\omega)| = \frac{1}{\sqrt{9+\omega^2}}$.`,
    },
    {
      points: 16,
      criteria: [
        { label: "Integraal correct opgezet over [−1,1]", points: 3 },
        { label: "Integratie van complexe exponentiaal correct", points: 4 },
        { label: "Grenswaarde ω = 0 correct behandeld", points: 3 },
        { label: "Nulpunten correct verklaard", points: 3 },
        { label: "Verband breedte puls en spectrum correct", points: 3 },
      ],
      question: r`## Fouriertransformatie van een rechthoekpuls

Bereken de Fouriertransformatie van $f(t) = 2$ voor $|t| \leq 1$, anders $0$.

**(a)** Bereken $\hat{f}(\omega)$ via de definitie. (12p)

**(b)** Beschrijf het spectrum. (4p)`,
      answer: r`## Oplossing

**(a)**

$$\hat{f}(\omega) = \frac{4\sin(\omega)}{\omega}, \quad \hat{f}(0) = 4$$

**(b)** Nulpunten bij $\omega = n\pi$.`,
    },
    {
      points: 16,
      criteria: [
        { label: "Integraal correct gesplitst in twee stukken", points: 2 },
        { label: "Partiële integratie op eerste deel correct", points: 3 },
        { label: "Partiële integratie op tweede deel correct", points: 3 },
        { label: "Eindresultaat correct vereenvoudigd", points: 2 },
        { label: "Verband met rechthoekpuls via convolutiestelling correct uitgelegd", points: 3 },
        { label: "Eindresultaat correct opgeschreven", points: 3 },
      ],
      question: r`## Fouriertransformatie van een driehoekspuls

Bereken de Fouriertransformatie van $f(t) = 1-|t|$ voor $|t| \leq 1$, anders $0$.

**(a)** Splits op en werk uit. (12p)

**(b)** Verband met convolutiestelling. (4p)`,
      answer: r`## Oplossing

**(a)**

$$\hat{f}(\omega) = \frac{4\sin^2(\omega/2)}{\omega^2}$$

**(b)** Driehoekspuls = convolutie van twee rechthoekpulsen.`,
    },
    {
      points: 16,
      criteria: [
        { label: "cos(t) correct geschreven als complexe exponenten", points: 3 },
        { label: "Eerste integraal correct berekend", points: 3 },
        { label: "Tweede integraal correct berekend", points: 3 },
        { label: "Eindresultaat correct gecombineerd", points: 3 },
        { label: "Concentratie rond ω = ±1 correct verklaard", points: 4 },
      ],
      question: r`## Fouriertransformatie van een afgeknipte cosinus

Bereken de Fouriertransformatie van $f(t) = \cos(t)$ voor $|t| \leq \pi$, anders $0$.

**(a)** Schrijf $\cos(t)$ als complexe exponenten en bereken. (12p)

**(b)** Verklaar de ligging van de spectraalpieken. (4p)`,
      answer: r`## Oplossing

**(a)**

$$\hat{f}(\omega) = \frac{\sin((\omega-1)\pi)}{\omega-1} + \frac{\sin((\omega+1)\pi)}{\omega+1}$$

**(b)** Sinc-functies gecentreerd bij $\omega = \pm 1$.`,
    },
    {
      points: 16,
      criteria: [
        { label: "Integraal correct gesplitst bij t = 0", points: 2 },
        { label: "Eerste deel correct via partiële integratie", points: 3 },
        { label: "Tweede deel correct via partiële integratie", points: 3 },
        { label: "Optelling en vereenvoudiging tot eindresultaat correct", points: 4 },
        { label: "|f̂(ω)| correct beschreven als bandpasvorm", points: 4 },
      ],
      question: r`## Fouriertransformatie van $f(t) = t\,e^{-|t|}$

Bereken de Fouriertransformatie van $f(t) = t\,e^{-|t|}$.

**(a)** Splits op en bereken via partiële integratie. (12p)

**(b)** Beschrijf $|\hat{f}(\omega)|$. (4p)`,
      answer: r`## Oplossing

**(a)**

$$\hat{f}(\omega) = \frac{-4i\omega}{(1+\omega^2)^2}$$

**(b)** Bandpasvorm: nul bij $\omega=0$, piek bij $|\omega|=\frac{1}{\sqrt{3}}$.`,
    },
    {
      points: 16,
      criteria: [
        { label: "sin(3t) correct geschreven als complexe exponenten", points: 3 },
        { label: "Beide integralen correct opgezet", points: 3 },
        { label: "Beide integralen correct berekend", points: 4 },
        { label: "Eindresultaat correct gecombineerd", points: 3 },
        { label: "Spectraalpieken bij ω = ±3 correct beschreven", points: 3 },
      ],
      question: r`## Fouriertransformatie van $f(t) = e^{-2t}\sin(3t)\,u(t)$

**(a)** Schrijf $\sin(3t)$ als complexe exponenten en bereken $\hat{f}(\omega)$. (12p)

**(b)** Beschrijf het amplitudespectrum. (4p)`,
      answer: r`## Oplossing

**(a)**

$$\hat{f}(\omega) = \frac{3}{(2+i\omega)^2+9}$$

**(b)** Pieken bij $\omega = \pm 3$.`,
    },
    {
      points: 16,
      criteria: [
        { label: "cos(ω₀t) correct geschreven als complexe exponenten", points: 2 },
        { label: "Integraal correct gesplitst in t < 0 en t ≥ 0", points: 2 },
        { label: "Alle vier deelintegralen correct berekend", points: 5 },
        { label: "Termen correct gecombineerd tot twee Lorentzianen", points: 4 },
        { label: "Effect van a op spectraalpieken correct beschreven", points: 3 },
      ],
      question: r`## Fouriertransformatie van $f(t) = e^{-a|t|}\cos(\omega_0 t)$

**(a)** Schrijf $\cos(\omega_0 t)$ als complexe exponenten, splits op en bereken $\hat{f}(\omega)$. (12p)

**(b)** Beschrijf de spectraalpieken. (4p)`,
      answer: r`## Oplossing

**(a)**

$$\hat{f}(\omega) = \frac{a}{a^2+(\omega-\omega_0)^2} + \frac{a}{a^2+(\omega+\omega_0)^2}$$

**(b)** Twee Lorentzianen bij $\omega = \pm\omega_0$.`,
    },
  ],

  inverse_fourier: [
    {
      points: 7,
      criteria: [
        { label: "Standaard Fourier-paar correct herkend", points: 2 },
        { label: "a = 2 correct geïdentificeerd", points: 2 },
        { label: "Correctiefactor ½ correct bepaald", points: 1 },
        { label: "Eindresultaat f(t) correct opgeschreven", points: 2 },
      ],
      question: r`## Inverse Fouriertransformatie

Gegeven: $\hat{f}(\omega) = \dfrac{2}{4+\omega^2}$

**(a)** Gebruik het Fourier-paar $e^{-a|t|} \leftrightarrow \dfrac{2a}{a^2+\omega^2}$ en identificeer $a$. (3p)

**(b)** Schrijf $f(t)$ op. (4p)`,
      answer: r`## Oplossing

**(a)** $a = 2$, correctiefactor $\frac{1}{2}$.

**(b)** $f(t) = \frac{1}{2}e^{-2|t|}$.`,
    },
    {
      points: 7,
      criteria: [
        { label: "Basispaar correct herkend en a = 1 geïdentificeerd", points: 2 },
        { label: "Factor e^{−3iω} correct gekoppeld aan verschuiving t₀ = 3", points: 2 },
        { label: "Tijdverschuivingsregel correct toegepast", points: 1 },
        { label: "Eindresultaat f(t) correct opgeschreven", points: 2 },
      ],
      question: r`## Inverse Fouriertransformatie via tijdverschuiving

Gegeven: $\hat{f}(\omega) = e^{-3i\omega}\cdot\dfrac{1}{1+i\omega}$

**(a)** Gebruik het basispaar $e^{-at}u(t) \leftrightarrow \dfrac{1}{a+i\omega}$ en identificeer $a$. (3p)

**(b)** Pas de tijdverschuivingsregel toe. (4p)`,
      answer: r`## Oplossing

**(a)** $a=1$, $g(t)=e^{-t}u(t)$.

**(b)** $f(t) = e^{-(t-3)}u(t-3)$.`,
    },
    {
      points: 7,
      criteria: [
        { label: "ĝ(ω) correct geïdentificeerd", points: 2 },
        { label: "g(t) = te^{−2t}u(t) correct bepaald", points: 2 },
        { label: "Differentiatieregel correct toegepast", points: 1 },
        { label: "Eindresultaat f(t) = (1−2t)e^{−2t}u(t) correct", points: 2 },
      ],
      question: r`## Inverse Fouriertransformatie via differentiatieregel

Gegeven: $\hat{f}(\omega) = \dfrac{i\omega}{(2+i\omega)^2}$

**(a)** Gebruik het paar $t\,e^{-at}u(t) \leftrightarrow \dfrac{1}{(a+i\omega)^2}$. (3p)

**(b)** Pas de differentiatieregel toe. (4p)`,
      answer: r`## Oplossing

**(a)** $g(t) = te^{-2t}u(t)$.

**(b)** $f(t) = (1-2t)e^{-2t}u(t)$.`,
    },
    {
      points: 7,
      criteria: [
        { label: "Rechthoekspectrum correct herkend als sinc in tijddomein", points: 2 },
        { label: "Inverse integraal correct opgezet", points: 2 },
        { label: "Integratie correct uitgewerkt", points: 2 },
        { label: "Eindresultaat als sinc correct opgeschreven", points: 1 },
      ],
      question: r`## Inverse Fouriertransformatie via rechthoekspectrum

Gegeven: $\hat{f}(\omega) = 1$ voor $|\omega| \leq 3$, anders $0$.

**(a)** Gebruik het Fourier-paar van een rechthoekpuls. (3p)

**(b)** Bepaal $f(t)$. (4p)`,
      answer: r`## Oplossing

**(a)** Rechthoekspectrum geeft sinc in tijddomein.

**(b)**

$$f(t) = \frac{\sin(3t)}{\pi t}$$`,
    },
    {
      points: 7,
      criteria: [
        { label: "n = 2 en a = 1 correct geïdentificeerd", points: 2 },
        { label: "Correctiefactor 3 correct bepaald", points: 2 },
        { label: "Eindresultaat f(t) = 3t²e^{−t}u(t) correct", points: 3 },
      ],
      question: r`## Inverse Fouriertransformatie via machtspaar

Gegeven: $\hat{f}(\omega) = \dfrac{6}{(1+i\omega)^3}$

**(a)** Gebruik het paar $t^n e^{-at}u(t) \leftrightarrow \dfrac{n!}{(a+i\omega)^{n+1}}$. (3p)

**(b)** Schrijf $f(t)$ op. (4p)`,
      answer: r`## Oplossing

**(a)** $n=2$, $a=1$, factor $3$.

**(b)** $f(t) = 3t^2e^{-t}u(t)$.`,
    },
    {
      points: 7,
      criteria: [
        { label: "Partiaalbreukontbinding correct opgezet", points: 2 },
        { label: "A = ½ en B = ½ correct bepaald", points: 2 },
        { label: "Beide Fourier-paren correct toegepast", points: 2 },
        { label: "Eindresultaat f(t) correct opgeschreven", points: 1 },
      ],
      question: r`## Inverse Fouriertransformatie via partiaalbreuken

Gegeven: $\hat{f}(\omega) = \dfrac{2+i\omega}{(1+i\omega)(3+i\omega)}$

**(a)** Ontbind in partiaalbreuken. (3p)

**(b)** Bepaal $f(t)$. (4p)`,
      answer: r`## Oplossing

**(a)** $A=\frac{1}{2}$, $B=\frac{1}{2}$.

**(b)** $f(t) = \frac{1}{2}e^{-t}u(t) + \frac{1}{2}e^{-3t}u(t)$.`,
    },
    {
      points: 7,
      criteria: [
        { label: "a = 3 correct geïdentificeerd", points: 2 },
        { label: "Factor e^{−2iω} correct gekoppeld aan verschuiving t₀ = 2", points: 2 },
        { label: "Tijdverschuivingsregel correct toegepast", points: 1 },
        { label: "Eindresultaat f(t) = e^{−3(t−2)}u(t−2) correct", points: 2 },
      ],
      question: r`## Inverse Fouriertransformatie via tijdverschuiving

Gegeven: $\hat{f}(\omega) = \dfrac{e^{-2i\omega}}{3+i\omega}$

**(a)** Gebruik het paar $e^{-at}u(t) \leftrightarrow \dfrac{1}{a+i\omega}$. (3p)

**(b)** Pas de tijdverschuivingsregel toe. (4p)`,
      answer: r`## Oplossing

**(a)** $a=3$, $g(t)=e^{-3t}u(t)$.

**(b)** $f(t) = e^{-3(t-2)}u(t-2)$.`,
    },
  ],

  convolutie: [
    {
      points: 9,
      criteria: [
        { label: "Convolutie-integraal correct opgezet met juiste grenzen", points: 2 },
        { label: "F̂(ω) en Ĝ(ω) correct bepaald", points: 2 },
        { label: "Product Ĥ(ω) correct opgesteld", points: 1 },
        { label: "Partiaalbreukontbinding correct", points: 2 },
        { label: "Eindresultaat correct via inversie", points: 2 },
      ],
      question: r`## Convolutie via de convolutiestelling

Gegeven $f(t) = e^{-t}u(t)$ en $g(t) = e^{-2t}u(t)$.

**(a)** Schrijf $(f * g)(t)$ op als integraal. (2p)

**(b)** Bereken via de convolutiestelling. (7p)`,
      answer: r`## Oplossing

**(a)** $(f*g)(t) = \int_0^t e^{-\tau}e^{-2(t-\tau)}\,d\tau$.

**(b)**

$$(f*g)(t) = (e^{-t}-e^{-2t})u(t)$$`,
    },
    {
      points: 9,
      criteria: [
        { label: "Convolutie-integraal correct opgezet", points: 2 },
        { label: "F̂(ω) correct bepaald", points: 2 },
        { label: "Ĥ(ω) = F̂(ω)² correct toegepast", points: 2 },
        { label: "Driehoekspuls correct geïdentificeerd als resultaat", points: 1 },
        { label: "Eindresultaat correct opgeschreven", points: 2 },
      ],
      question: r`## Convolutie van twee rechthoekpulsen

Gegeven $f(t) = g(t) = 1$ voor $0 \leq t \leq 1$, anders $0$.

**(a)** Schrijf $(f * g)(t)$ op als integraal. (2p)

**(b)** Bereken via de convolutiestelling. (7p)`,
      answer: r`## Oplossing

**(b)**

$$(f*g)(t) = \begin{cases} t & 0 \leq t \leq 1 \\ 2-t & 1 < t \leq 2 \\ 0 & \text{anders} \end{cases}$$`,
    },
    {
      points: 9,
      criteria: [
        { label: "Convolutie-integraal correct opgezet met juiste grenzen", points: 2 },
        { label: "F̂(ω) en Ĝ(ω) correct bepaald", points: 2 },
        { label: "Ĥ(ω) = 1/(1+iω)³ correct bepaald", points: 2 },
        { label: "Standaard paar correct toegepast", points: 2 },
        { label: "Eindresultaat correct opgeschreven", points: 1 },
      ],
      question: r`## Convolutie via partiaalbreuken

Gegeven $f(t) = t\,e^{-t}u(t)$ en $g(t) = e^{-t}u(t)$.

**(a)** Schrijf $(f * g)(t)$ op als integraal. (2p)

**(b)** Bereken via de convolutiestelling. (7p)`,
      answer: r`## Oplossing

**(b)**

$$(f*g)(t) = \frac{t^2}{2}e^{-t}u(t)$$`,
    },
    {
      points: 9,
      criteria: [
        { label: "Convolutie-integraal correct opgezet", points: 2 },
        { label: "F̂(ω) en Ĝ(ω) = e^{−2iω} correct bepaald", points: 2 },
        { label: "Tijdverschuivingsregel correct toegepast", points: 2 },
        { label: "Eindresultaat e^{−(t−2)}u(t−2) correct", points: 2 },
        { label: "Fysische interpretatie correct gegeven", points: 1 },
      ],
      question: r`## Convolutie met een delta

Gegeven $f(t) = e^{-t}u(t)$ en $g(t) = \delta(t-2)$.

**(a)** Schrijf $(f * g)(t)$ op als integraal. (2p)

**(b)** Gebruik de convolutiestelling. (7p)`,
      answer: r`## Oplossing

**(b)** $\hat{H}(\omega) = \frac{e^{-2i\omega}}{1+i\omega}$:

$$(f*g)(t) = e^{-(t-2)}u(t-2)$$`,
    },
    {
      points: 9,
      criteria: [
        { label: "F̂(ω) en Ĝ(ω) correct bepaald", points: 2 },
        { label: "Ĥ(ω) correct opgesteld", points: 1 },
        { label: "Partiaalbreukontbinding correct opgezet", points: 2 },
        { label: "Coëfficiënten A, B, C correct bepaald", points: 2 },
        { label: "Eindresultaat correct via inversie", points: 2 },
      ],
      question: r`## Convolutie van een exponentiaal en een sinus

Gegeven $f(t) = e^{-t}u(t)$ en $g(t) = \sin(t)\,u(t)$.

**(a)** Bereken $\hat{H}(\omega)$ en ontbind in partiaalbreuken. (4p)

**(b)** Inverteer naar $(f*g)(t)$. (5p)`,
      answer: r`## Oplossing

**(b)**

$$(f*g)(t) = \tfrac{1}{2}e^{-t}u(t) + \tfrac{1}{2}te^{-t}u(t) - \tfrac{1}{2}e^{t}u(-t)$$`,
    },
    {
      points: 9,
      criteria: [
        { label: "F̂(ω) en Ĝ(ω) correct bepaald", points: 2 },
        { label: "Product Ĥ(ω) correct opgesteld", points: 1 },
        { label: "Partiaalbreukontbinding correct", points: 2 },
        { label: "Coëfficiënten correct bepaald", points: 2 },
        { label: "Eindresultaat correct via inversie", points: 2 },
      ],
      question: r`## Convolutie in het frequentiedomein

Gegeven $f(t) = e^{-2t}u(t)$ en $g(t) = e^{-t}u(t)$.

**(a)** Bereken $\hat{H}(\omega)$ en ontbind in partiaalbreuken. (4p)

**(b)** Bepaal $(f*g)(t)$. (5p)`,
      answer: r`## Oplossing

**(b)**

$$(f*g)(t) = (e^{-t}-e^{-2t})u(t)$$`,
    },
    {
      points: 9,
      criteria: [
        { label: "Convolutie-integraal correct opgezet", points: 2 },
        { label: "F̂(ω) en Ĝ(ω) correct bepaald", points: 2 },
        { label: "Partiaalbreukontbinding correct", points: 2 },
        { label: "Coëfficiënten correct bepaald", points: 1 },
        { label: "Eindresultaat correct via inversie", points: 2 },
      ],
      question: r`## Convolutie via de convolutiestelling

Gegeven $f(t) = e^{-3t}u(t)$ en $g(t) = e^{-t}u(t)$.

**(a)** Schrijf $(f*g)(t)$ op als integraal. (2p)

**(b)** Bereken via de convolutiestelling. (7p)`,
      answer: r`## Oplossing

**(b)**

$$(f*g)(t) = \tfrac{1}{2}(e^{-t}-e^{-3t})u(t)$$`,
    },
    {
      points: 9,
      criteria: [
        { label: "Convolutie-integraal correct opgezet", points: 2 },
        { label: "F̂(ω) en Ĝ(ω) correct bepaald", points: 2 },
        { label: "Ĥ(ω) correct opgesteld", points: 1 },
        { label: "Partiaalbreukontbinding correct uitgewerkt", points: 2 },
        { label: "Eindresultaat correct via inversie", points: 2 },
      ],
      question: r`## Convolutie van $\cos(t)\,u(t)$ en $e^{-t}u(t)$

Gegeven $f(t) = \cos(t)\,u(t)$ en $g(t) = e^{-t}u(t)$.

**(a)** Schrijf $(f*g)(t)$ op als integraal. (2p)

**(b)** Bereken via de convolutiestelling en partiaalbreuken. (7p)`,
      answer: r`## Oplossing

**(b)**

$$(f*g)(t) = -\tfrac{1}{4}e^{-t}u(t) - \tfrac{1}{2}te^{-t}u(t) + \tfrac{1}{4}e^{t}u(-t)$$`,
    },
    {
      points: 9,
      criteria: [
        { label: "Convolutie-integraal correct opgezet", points: 2 },
        { label: "F̂(ω) correct bepaald", points: 2 },
        { label: "Ĥ(ω) = F̂(ω)² correct toegepast", points: 2 },
        { label: "Driehoekspuls correct geïdentificeerd", points: 1 },
        { label: "Eindresultaat correct opgeschreven", points: 2 },
      ],
      question: r`## Convolutie van twee verschoven rechthoekpulsen

Gegeven $f(t) = g(t) = u(t) - u(t-2)$.

**(a)** Schrijf $(f*g)(t)$ op als integraal. (2p)

**(b)** Bereken via de convolutiestelling. (7p)`,
      answer: r`## Oplossing

**(b)**

$$(f*g)(t) = \begin{cases} t & 0 \leq t \leq 2 \\ 4-t & 2 < t \leq 4 \\ 0 & \text{anders} \end{cases}$$`,
    },
  ],

  filters: [
    {
      points: 5,
      criteria: [
        { label: "Filtertype correct benoemd als band-pass", points: 2 },
        { label: "Motivatie waarom laagdoorlaat niet geschikt is", points: 1 },
        { label: "Motivatie waarom hoogdoorlaat niet geschikt is", points: 1 },
        { label: "Conclusie correct en volledig", points: 1 },
      ],
      question: r`## Filter selectie: audio banddoorlaat

Een ingenieur wil alleen frequenties tussen 500 Hz en 2000 Hz doorlaten.

Welk type filter past hier? Benoem het filtertype en motiveer je keuze. (5p)`,
      answer: r`## Oplossing

**Band-pass filter.** Laagdoorlaat laat ook lage frequenties door; hoogdoorlaat laat ook frequenties boven 2000 Hz door. Alleen band-pass laat precies de gewenste band door.`,
    },
    {
      points: 5,
      criteria: [
        { label: "Filtertype correct benoemd als high-pass", points: 2 },
        { label: "Motivatie waarom laagdoorlaat niet geschikt is", points: 1 },
        { label: "Motivatie waarom band-stop niet geschikt is", points: 1 },
        { label: "Conclusie correct en volledig", points: 1 },
      ],
      question: r`## Filter selectie: audio gebrom

Een audio-ingenieur wil achtergrondgebrom (onder 100 Hz) verwijderen.

Welk filter is geschikt? Benoem en motiveer. (5p)`,
      answer: r`## Oplossing

**High-pass filter.** Laagdoorlaat laat het gebrom juist door. Band-stop is voor een smalle band, niet voor alles onder 100 Hz.`,
    },
    {
      points: 5,
      criteria: [
        { label: "Filtertype correct benoemd als band-stop / notch", points: 2 },
        { label: "Motivatie waarom hoogdoorlaat niet geschikt is", points: 1 },
        { label: "Motivatie waarom laagdoorlaat niet geschikt is", points: 1 },
        { label: "Conclusie correct en volledig", points: 1 },
      ],
      question: r`## Filter selectie: biomedisch ECG

In een ECG-signaal is een storende 50 Hz netspanning aanwezig.

Welk filter verwijdert deze storing? Benoem en motiveer. (5p)`,
      answer: r`## Oplossing

**Band-stop filter (notch).** Hoogdoorlaat verwijdert lage ECG-componenten; laagdoorlaat verwijdert hoge componenten. Notch verwijdert alleen de smalle band rondom 50 Hz.`,
    },
    {
      points: 5,
      criteria: [
        { label: "Filtertype correct benoemd als band-pass", points: 2 },
        { label: "Motivatie waarom laagdoorlaat niet voldoende is", points: 1 },
        { label: "Motivatie waarom hoogdoorlaat niet voldoende is", points: 1 },
        { label: "Conclusie correct en volledig", points: 1 },
      ],
      question: r`## Filter selectie: seismologie

Een seismograaf registreert 1–10 Hz maar ontvangt ook drift (< 0.5 Hz) en ruis (> 50 Hz).

Welk filter isoleert het nuttige signaal? Benoem en motiveer. (5p)`,
      answer: r`## Oplossing

**Band-pass filter.** Laagdoorlaat laat drift door; hoogdoorlaat laat ruis door. Alleen band-pass onderdrukt beide verstoringen.`,
    },
    {
      points: 5,
      criteria: [
        { label: "Filtertype correct benoemd als low-pass", points: 2 },
        { label: "Motivatie waarom hoogdoorlaat niet geschikt is", points: 1 },
        { label: "Motivatie waarom band-pass niet geschikt is", points: 1 },
        { label: "Conclusie correct en volledig", points: 1 },
      ],
      question: r`## Filter selectie: audio hoogfrequent

Een ingenieur wil een fluittoon boven 8000 Hz verwijderen.

Welk filter is geschikt? Benoem en motiveer. (5p)`,
      answer: r`## Oplossing

**Low-pass filter.** Hoogdoorlaat doet het omgekeerde; band-pass blokkeert ook lage nuttige frequenties.`,
    },
    {
      points: 5,
      criteria: [
        { label: "Filtertype correct benoemd als band-pass", points: 2 },
        { label: "Motivatie waarom laagdoorlaat niet geschikt is", points: 1 },
        { label: "Motivatie waarom hoogdoorlaat niet geschikt is", points: 1 },
        { label: "Conclusie correct en volledig", points: 1 },
      ],
      question: r`## Filter selectie: radiofrequentie

Een radiosysteem wil uitsluitend het signaal rond 100 MHz ontvangen.

Welk filter is geschikt? Benoem en motiveer. (5p)`,
      answer: r`## Oplossing

**Band-pass filter.** Laagdoorlaat laat ook lage frequenties door; hoogdoorlaat laat ook andere stations door.`,
    },
    {
      points: 5,
      criteria: [
        { label: "Twee band-stop filters correct benoemd", points: 2 },
        { label: "Motivatie waarom één filter niet voldoende is", points: 1 },
        { label: "Motivatie waarom andere filtertypen niet geschikt zijn", points: 1 },
        { label: "Conclusie correct en volledig", points: 1 },
      ],
      question: r`## Filter selectie: twee stoortonen

Twee stoortonen op 1 kHz en 3 kHz verstoren een signaal.

Welk filter(s) verwijder(t)(en) beide stoortonen? Benoem en motiveer. (5p)`,
      answer: r`## Oplossing

**Twee band-stop filters (notch).** Eén notch filter kan maar één frequentie onderdrukken. Andere filtertypen beschadigen het nuttige signaal.`,
    },
  ],

  laplace: [
    {
      points: 16,
      criteria: [
        { label: "sin(2t) correct geschreven als complexe exponenten", points: 3 },
        { label: "Beide integralen correct opgezet", points: 3 },
        { label: "Eerste integraal correct berekend", points: 3 },
        { label: "Tweede integraal correct berekend", points: 3 },
        { label: "Gebruik van e^{±2iπ} = 1 correct", points: 2 },
        { label: "Eindresultaat correct opgeschreven", points: 2 },
      ],
      question: r`## Laplacetransformatie van een afgeknipte sinus

$$f(t) = \begin{cases}\sin(2t) & 0 \leq t < \pi \\ 0 & t \geq \pi\end{cases}$$

**(a)** Schrijf $\sin(2t)$ als complexe exponenten en stel het integraal op. (4p)

**(b)** Werk volledig uit. (12p)`,
      answer: r`## Oplossing

$$F(s) = \frac{2(1-e^{-s\pi})}{s^2+4}$$`,
    },
    {
      points: 16,
      criteria: [
        { label: "Integraal correct opgezet met juiste grenzen", points: 3 },
        { label: "Partiële integratie correct opgezet", points: 4 },
        { label: "Randterm correct geëvalueerd", points: 3 },
        { label: "Restintegraal correct berekend", points: 3 },
        { label: "Eindresultaat correct opgeschreven", points: 3 },
      ],
      question: r`## Laplacetransformatie van een stuksgewijze functie

$$f(t) = \begin{cases}t & 0 \leq t < 2 \\ 0 & t \geq 2\end{cases}$$

**(a)** Stel het integraal op. (4p)

**(b)** Werk uit via partiële integratie. (12p)`,
      answer: r`## Oplossing

$$F(s) = \frac{1}{s^2} - e^{-2s}\!\left(\frac{2}{s}+\frac{1}{s^2}\right)$$`,
    },
    {
      points: 16,
      criteria: [
        { label: "Integraal correct opgezet met juiste grenzen", points: 3 },
        { label: "Substitutie τ = t−1 correct uitgevoerd", points: 4 },
        { label: "Factor e^{−s} correct naar buiten gehaald", points: 3 },
        { label: "Restintegraal correct berekend", points: 3 },
        { label: "Eindresultaat correct opgeschreven", points: 3 },
      ],
      question: r`## Laplacetransformatie met tijdverschuiving

$$f(t) = \begin{cases}0 & 0 \leq t < 1 \\ e^{-2(t-1)} & t \geq 1\end{cases}$$

**(a)** Stel het integraal op en pas substitutie $\tau = t-1$ toe. (4p)

**(b)** Werk volledig uit. (12p)`,
      answer: r`## Oplossing

$$F(s) = \frac{e^{-s}}{s+2}$$`,
    },
    {
      points: 16,
      criteria: [
        { label: "Integraal correct gesplitst in twee delen", points: 3 },
        { label: "Eerste integraal correct berekend", points: 4 },
        { label: "Tweede integraal correct berekend", points: 4 },
        { label: "Beide delen correct gecombineerd", points: 2 },
        { label: "Eindresultaat correct opgeschreven", points: 3 },
      ],
      question: r`## Laplacetransformatie van een stuksgewijze functie

$$f(t) = \begin{cases}2 & 0 \leq t < 3 \\ e^{-t} & t \geq 3\end{cases}$$

**(a)** Splits op in twee integralen. (4p)

**(b)** Werk beide uit en combineer. (12p)`,
      answer: r`## Oplossing

$$F(s) = \frac{2(1-e^{-3s})}{s} + \frac{e^{-3(s+1)}}{s+1}$$`,
    },
    {
      points: 16,
      criteria: [
        { label: "cos(t) correct geschreven als complexe exponenten", points: 3 },
        { label: "Beide integralen correct opgezet", points: 3 },
        { label: "Gebruik van e^{±iπ} = −1 correct", points: 3 },
        { label: "Beide integralen correct berekend", points: 4 },
        { label: "Eindresultaat correct opgeschreven", points: 3 },
      ],
      question: r`## Laplacetransformatie van een afgeknipte cosinus

$$f(t) = \begin{cases}\cos(t) & 0 \leq t < \pi \\ 0 & t \geq \pi\end{cases}$$

**(a)** Schrijf $\cos(t)$ als complexe exponenten. (4p)

**(b)** Werk volledig uit. (12p)`,
      answer: r`## Oplossing

$$F(s) = \frac{(1+e^{-s\pi})s}{s^2+1}$$`,
    },
    {
      points: 16,
      criteria: [
        { label: "Integraal correct opgezet", points: 3 },
        { label: "Standaard paar correct herkend met n=2, a=3", points: 5 },
        { label: "Eindresultaat F(s) = 2/(s+3)³ correct", points: 4 },
        { label: "Convergentiegebied correct vermeld", points: 4 },
      ],
      question: r`## Laplacetransformatie via standaard paar

$$f(t) = t^2\,e^{-3t}\,u(t)$$

**(a)** Stel het integraal op. (4p)

**(b)** Werk uit via het standaard paar. (12p)`,
      answer: r`## Oplossing

$$F(s) = \frac{2}{(s+3)^3}, \quad \text{Re}(s) > -3$$`,
    },
    {
      points: 16,
      criteria: [
        { label: "Integraal correct opgezet met juiste grenzen", points: 3 },
        { label: "Substitutie τ = t−2 correct uitgevoerd", points: 4 },
        { label: "Factor e^{−2s} correct naar buiten gehaald", points: 3 },
        { label: "Restintegraal correct berekend", points: 3 },
        { label: "Eindresultaat correct opgeschreven", points: 3 },
      ],
      question: r`## Laplacetransformatie met tijdverschuiving

$$f(t) = \begin{cases}0 & 0 \leq t < 2 \\ t-2 & t \geq 2\end{cases}$$

**(a)** Stel het integraal op en pas substitutie $\tau = t-2$ toe. (4p)

**(b)** Werk volledig uit. (12p)`,
      answer: r`## Oplossing

$$F(s) = \frac{e^{-2s}}{s^2}$$`,
    },
  ],

  pde: [
    {
      points: 10,
      criteria: [
        { label: "Fouriertransformatie correct toegepast op beide zijden", points: 2 },
        { label: "Differentiatieregel F{u_xx} = −ω²û correct gebruikt", points: 2 },
        { label: "GDV in t correct opgelost", points: 2 },
        { label: "Beginvoorwaarde û(ω,0) correct berekend", points: 2 },
        { label: "Inversie naar u(x,t) correct uitgevoerd", points: 2 },
      ],
      question: r`## Warmtevergelijking

$$\frac{\partial u}{\partial t} = 2\frac{\partial^2 u}{\partial x^2}, \quad u(x,0) = e^{-2x^2}$$

**(a)** Pas Fouriertransformatie toe in $x$. (4p)

**(b)** Los op in $t$. (3p)

**(c)** Inverteer. (3p)`,
      answer: r`## Oplossing

$$u(x,t) = \frac{1}{\sqrt{1+16t}}\,e^{-2x^2/(1+16t)}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Fouriertransformatie correct toegepast", points: 2 },
        { label: "Differentiatieregel correct gebruikt", points: 2 },
        { label: "GDV in t correct opgelost", points: 2 },
        { label: "Beginvoorwaarde correct berekend", points: 2 },
        { label: "Inversie correct uitgevoerd", points: 2 },
      ],
      question: r`## Warmtevergelijking

$$\frac{\partial u}{\partial t} = k\frac{\partial^2 u}{\partial x^2}, \quad u(x,0) = e^{-x^2}$$

**(a)** Pas Fouriertransformatie toe. (4p)

**(b)** Los op in $t$. (3p)

**(c)** Inverteer. (3p)`,
      answer: r`## Oplossing

$$u(x,t) = \frac{1}{\sqrt{1+4kt}}\,e^{-x^2/(1+4kt)}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Fouriertransformatie correct toegepast", points: 2 },
        { label: "Algemene oplossing A cos + B sin correct opgezet", points: 2 },
        { label: "Beginvoorwaarden correct verwerkt (B=0, A correct)", points: 2 },
        { label: "Beginvoorwaarde û(ω,0) correct berekend", points: 2 },
        { label: "Inversie correct via d'Alembert", points: 2 },
      ],
      question: r`## Golfvergelijking

$$\frac{\partial^2 u}{\partial t^2} = c^2\frac{\partial^2 u}{\partial x^2}, \quad u(x,0) = e^{-|x|},\quad u_t(x,0) = 0$$

**(a)** Pas Fouriertransformatie toe. (4p)

**(b)** Los op. (3p)

**(c)** Schrijf $u(x,t)$ op. (3p)`,
      answer: r`## Oplossing

$$u(x,t) = \tfrac{1}{2}\left(e^{-|x+ct|}+e^{-|x-ct|}\right)$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Laplacetransformatie correct toegepast", points: 2 },
        { label: "Beginvoorwaarden correct verwerkt", points: 2 },
        { label: "Y(s) correct opgelost", points: 2 },
        { label: "Partiaalbreukontbinding correct uitgewerkt", points: 2 },
        { label: "Inversie correct", points: 2 },
      ],
      question: r`## Gedempte oscillator

$$y'' + 3y' + 2y = e^{-t}, \quad y(0)=0,\; y'(0)=1$$

**(a)** Pas Laplacetransformatie toe. (4p)

**(b)** Los op naar $Y(s)$. (3p)

**(c)** Inverteer. (3p)`,
      answer: r`## Oplossing

$$y(t) = e^{-t} - e^{-2t} + te^{-t}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Fouriertransformatie correct toegepast", points: 2 },
        { label: "Differentiatieregel correct gebruikt", points: 2 },
        { label: "GDV in t correct opgelost", points: 2 },
        { label: "Beginvoorwaarde correct berekend", points: 2 },
        { label: "Inversie correct uitgevoerd", points: 2 },
      ],
      question: r`## Warmtevergelijking

$$\frac{\partial u}{\partial t} = 3\frac{\partial^2 u}{\partial x^2}, \quad u(x,0) = e^{-x^2}$$

**(a)** Pas Fouriertransformatie toe. (4p)

**(b)** Los op in $t$. (3p)

**(c)** Inverteer. (3p)`,
      answer: r`## Oplossing

$$u(x,t) = \frac{1}{\sqrt{1+12t}}\,e^{-x^2/(1+12t)}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Laplacetransformatie correct toegepast", points: 2 },
        { label: "Beginvoorwaarden correct verwerkt", points: 2 },
        { label: "Y(s) correct opgelost en partiaalbreuken correct", points: 2 },
        { label: "Coëfficiënten correct bepaald", points: 2 },
        { label: "Inversie correct", points: 2 },
      ],
      question: r`## Gedempte oscillator

$$y'' + 5y' + 6y = e^{-2t}, \quad y(0)=1,\; y'(0)=0$$

**(a)** Pas Laplacetransformatie toe. (4p)

**(b)** Los op naar $Y(s)$. (3p)

**(c)** Inverteer. (3p)`,
      answer: r`## Oplossing

$$y(t) = 4e^{-2t} - e^{-3t} + te^{-2t}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Fouriertransformatie correct toegepast", points: 2 },
        { label: "Algemene oplossing correct opgezet", points: 2 },
        { label: "Beginvoorwaarden correct verwerkt", points: 2 },
        { label: "Beginvoorwaarde û(ω,0) correct berekend", points: 2 },
        { label: "Inversie correct via d'Alembert", points: 2 },
      ],
      question: r`## Golfvergelijking

$$\frac{\partial^2 u}{\partial t^2} = 4\frac{\partial^2 u}{\partial x^2}, \quad u(x,0) = e^{-2|x|},\quad u_t(x,0) = 0$$

**(a)** Pas Fouriertransformatie toe. (4p)

**(b)** Los op. (3p)

**(c)** Schrijf $u(x,t)$ op. (3p)`,
      answer: r`## Oplossing

$$u(x,t) = \tfrac{1}{2}\left(e^{-2|x+2t|}+e^{-2|x-2t|}\right)$$`,
    },
  ],

  machtreeks: [
    {
      points: 10,
      criteria: [
        { label: "Ansatz y = Σaₙxⁿ correct opgezet en afgeleiden bepaald", points: 2 },
        { label: "Substitutie in de vergelijking correct", points: 2 },
        { label: "Groepering per macht van x correct", points: 2 },
        { label: "Recurrentierelaties correct bepaald", points: 2 },
        { label: "Coëfficiënten en eindoplossing correct opgeschreven", points: 2 },
      ],
      question: r`## Machtreeks: $y'' + xy' - 2y = 0$

$y(0)=1,\; y'(0)=0$. Bepaal de machtreeksoplossing tot en met $x^4$.

**(a)** Substitueer en groepeer. (6p)

**(b)** Bepaal de coëfficiënten en schrijf de oplossing op. (4p)`,
      answer: r`## Oplossing

$$y \approx 1 + x^2$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Ansatz correct opgezet en afgeleiden bepaald", points: 2 },
        { label: "Substitutie correct", points: 2 },
        { label: "Groepering correct", points: 2 },
        { label: "Recurrentierelaties correct", points: 2 },
        { label: "Coëfficiënten en eindoplossing correct", points: 2 },
      ],
      question: r`## Machtreeks: $y'' - xy' - y = 0$

$y(0)=1,\; y'(0)=0$. Bepaal de machtreeksoplossing tot en met $x^4$.

**(a)** Substitueer en groepeer. (6p)

**(b)** Bepaal de coëfficiënten en schrijf de oplossing op. (4p)`,
      answer: r`## Oplossing

$$y \approx 1 + \frac{x^2}{2} + \frac{x^4}{8}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Ansatz correct opgezet en afgeleiden bepaald", points: 2 },
        { label: "Substitutie correct", points: 2 },
        { label: "Groepering correct", points: 2 },
        { label: "Recurrentierelaties correct", points: 2 },
        { label: "Coëfficiënten en eindoplossing correct", points: 2 },
      ],
      question: r`## Machtreeks: $y'' + x^2 y = 0$

$y(0)=0,\; y'(0)=1$. Bepaal de machtreeksoplossing tot en met $x^5$.

**(a)** Substitueer en groepeer. (6p)

**(b)** Bepaal de coëfficiënten en schrijf de oplossing op. (4p)`,
      answer: r`## Oplossing

$$y \approx x - \frac{x^5}{20}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Ansatz correct opgezet en (1+x²)y'' correct uitgewerkt", points: 2 },
        { label: "Substitutie correct", points: 2 },
        { label: "Groepering correct", points: 2 },
        { label: "Recurrentierelaties correct", points: 2 },
        { label: "Coëfficiënten en eindoplossing correct", points: 2 },
      ],
      question: r`## Machtreeks: $(1+x^2)y'' - y = 0$

$y(0)=1,\; y'(0)=1$. Bepaal de machtreeksoplossing tot en met $x^4$.

**(a)** Substitueer en groepeer. (6p)

**(b)** Bepaal de coëfficiënten en schrijf de oplossing op. (4p)`,
      answer: r`## Oplossing

$$y \approx 1 + x + \frac{x^2}{2} + \frac{x^3}{6} - \frac{x^4}{24}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Ansatz correct opgezet en afgeleiden bepaald", points: 2 },
        { label: "Substitutie correct", points: 2 },
        { label: "Groepering correct", points: 2 },
        { label: "Recurrentierelaties correct", points: 2 },
        { label: "Coëfficiënten en eindoplossing correct", points: 2 },
      ],
      question: r`## Machtreeks: $y'' - 2xy' + y = 0$

$y(0)=0,\; y'(0)=1$. Bepaal de machtreeksoplossing tot en met $x^5$.

**(a)** Substitueer en groepeer. (6p)

**(b)** Bepaal de coëfficiënten en schrijf de oplossing op. (4p)`,
      answer: r`## Oplossing

$$y \approx x + \frac{x^3}{6} + \frac{x^5}{24}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Ansatz correct opgezet en (1−x²)y'' correct uitgewerkt", points: 2 },
        { label: "Substitutie correct", points: 2 },
        { label: "Groepering correct", points: 2 },
        { label: "Recurrentierelaties correct", points: 2 },
        { label: "Coëfficiënten en eindoplossing correct", points: 2 },
      ],
      question: r`## Machtreeks: $(1-x^2)y'' - 2xy' + 2y = 0$

$y(0)=1,\; y'(0)=0$. Bepaal de machtreeksoplossing tot en met $x^4$.

**(a)** Substitueer en groepeer. (6p)

**(b)** Bepaal de coëfficiënten en schrijf de oplossing op. (4p)`,
      answer: r`## Oplossing

$$y \approx 1 - x^2 - \frac{x^4}{2}$$`,
    },
    {
      points: 10,
      criteria: [
        { label: "Ansatz correct opgezet en afgeleiden bepaald", points: 2 },
        { label: "Substitutie correct", points: 2 },
        { label: "Groepering correct", points: 2 },
        { label: "Recurrentierelaties correct", points: 2 },
        { label: "Coëfficiënten en eindoplossing correct", points: 2 },
      ],
      question: r`## Machtreeks: $y'' + x\,y = 0$

$y(0)=1,\; y'(0)=0$. Bepaal de machtreeksoplossing tot en met $x^5$.

**(a)** Substitueer en groepeer. (6p)

**(b)** Bepaal de coëfficiënten en schrijf de oplossing op. (4p)`,
      answer: r`## Oplossing

$$y \approx 1 - \frac{x^3}{6}$$`,
    },
  ],

  python_fft: [
    { points: 7, criteria: [{ label: "Doel van FFT correct beschreven", points: 2 },{ label: "Doel van IFFT correct beschreven", points: 2 },{ label: "Conclusie dat geen nuttige bewerking plaatsvindt correct", points: 2 },{ label: "Suggestie voor zinvolle tussenstap correct gegeven", points: 1 }], question: "## Python & FFT – Codevraag A\n\n<pre>a = np.fft.fft(input1d)\noutput = np.fft.ifft(a).real</pre>\n\n(7p) Leg uit wat dit stuk code voor doel heeft.", answer: "FFT zet signaal naar frequentiedomein; IFFT zet het terug. Zonder tussenstap is het resultaat identiek aan het invoersignaal. De code doet niets nuttigs." },
    { points: 7, criteria: [{ label: "Fout in volgorde correct geïdentificeerd", points: 3 },{ label: "Correcte volgorde FFT → bewerking → IFFT beschreven", points: 2 },{ label: "Uitleg waarom IFFT eerst geen betekenis heeft", points: 2 }], question: "## Python & FFT – Codevraag B\n\n<pre>a = np.fft.ifft(input1d)\noutput = np.fft.fft(a).real</pre>\n\n(7p) Is de volgorde correct? Leg uit.", answer: "Volgorde omgedraaid. Correct: FFT → bewerking → IFFT. IFFT op tijddomein-signaal heeft geen fysische betekenis." },
    { points: 7, criteria: [{ label: "Fout correct geïdentificeerd", points: 2 },{ label: "Verlies van fase-informatie correct uitgelegd", points: 2 },{ label: "Correcte alternatieven gegeven (np.abs, np.abs)**2)", points: 2 },{ label: "Correcte aanpak voor reconstructie", points: 1 }], question: "## Python & FFT – Codevraag C\n\n<pre>a = np.fft.fft(input1d)\noutput = a.real</pre>\n\n(7p) Leg uit wat er fout is.", answer: "FFT geeft complexe getallen. .real gooit fase weg. Gebruik np.abs(a) voor amplitude, np.abs(a)**2 voor vermogen, np.fft.ifft(a).real voor reconstructie." },
    { points: 7, criteria: [{ label: "Doel van het venster correct beschreven", points: 2 },{ label: "Fout correct geïdentificeerd: venster in frequentiedomein", points: 3 },{ label: "Correcte code opgeschreven", points: 2 }], question: "## Python & FFT – Codevraag D\n\n<pre>a = np.hanning(len(input1d))\nb = np.fft.fft(input1d)\nc = a * b\noutput = np.abs(c)</pre>\n\n(7p) Wat probeert deze code? Zit er een fout in?", answer: "Probeert gevensterd amplitudespectrum te berekenen. Fout: venster in frequentiedomein i.p.v. tijddomein. Correct: b = input1d * a; output = np.abs(np.fft.fft(b))." },
    { points: 7, criteria: [{ label: "Doel van het Bartlett-venster correct beschreven", points: 2 },{ label: "Correcte volgorde: venster vóór FFT herkend", points: 2 },{ label: "Resultaat als complex spectrum correct beschreven", points: 2 },{ label: "Opmerking over np.abs() voor amplitudespectrum", points: 1 }], question: "## Python & FFT – Codevraag E\n\n<pre>a = np.bartlett(len(input1d))\nb = input1d * a\noutput = np.fft.fft(b)</pre>\n\n(7p) Leg uit wat dit doet.", answer: "Past Bartlett-venster toe vóór FFT om spectrale lekage te verminderen. Resultaat is complex spectrum. Voor amplitude: np.abs(output)." },
    { points: 7, criteria: [{ label: "Fout correct geïdentificeerd: venster in frequentiedomein", points: 3 },{ label: "Effect van fout correct uitgelegd", points: 2 },{ label: "Correcte code opgeschreven", points: 2 }], question: "## Python & FFT – Codevraag F\n\n<pre>a = np.fft.fft(input1d)\nb = np.hamming(len(input1d))\noutput = np.fft.ifft(a * b).real</pre>\n\n(7p) Leg uit wat er fout is.", answer: "Hamming-venster in frequentiedomein i.p.v. tijddomein. Correct: b = np.hamming(...); a = np.fft.fft(input1d * b)." },
    { points: 7, criteria: [{ label: "Fout correct geïdentificeerd: optelling i.p.v. vermenigvuldiging", points: 3 },{ label: "Uitleg dat optelling = optelling in tijddomein", points: 2 },{ label: "Correcte aanpak voor convolutie gegeven", points: 2 }], question: "## Python & FFT – Codevraag G\n\n<pre>a = np.fft.fft(input1d_1)\nb = np.fft.fft(input1d_2)\nc = a + b\noutput = np.fft.ifft(c).real</pre>\n\n(7p) Leg uit wat er fout is.", answer: "Optelling i.p.v. vermenigvuldiging. Optelling = optelling in tijddomein. Voor convolutie: c = a * b." },
    { points: 7, criteria: [{ label: "Doel als convolutie correct beschreven", points: 2 },{ label: "Convolutiestelling correct uitgelegd", points: 2 },{ label: "Efficiëntie O(N log N) vermeld", points: 1 },{ label: "Verschil lineaire vs. circulaire convolutie benoemd", points: 2 }], question: "## Python & FFT – Codevraag H\n\n<pre>a = np.fft.fft(input1d_1)\nb = np.fft.fft(input1d_2)\nc = a * b\noutput = np.fft.ifft(c).real</pre>\n\n(7p) Leg uit wat dit doet.", answer: "Berekent convolutie via convolutiestelling. Efficiënt: O(N log N). Let op: circulaire convolutie; voor lineaire: zero-padding nodig." },
    { points: 7, criteria: [{ label: "Equivalente FFT-code correct opgeschreven", points: 3 },{ label: "Verschil lineaire vs. circulaire convolutie uitgelegd", points: 2 },{ label: "Zero-padding benoemd als oplossing", points: 2 }], question: "## Python & FFT – Codevraag I\n\n<pre>a = np.convolve(input1d_1, input1d_2)\noutput = a</pre>\n\n(7p) Schrijf de equivalente FFT-code.", answer: "a = np.fft.fft(input1d_1); b = np.fft.fft(input1d_2); c = a * b; output = np.fft.ifft(c).real. Let op: zero-padding voor lineaire convolutie." },
    { points: 7, criteria: [{ label: "Fout correct geïdentificeerd: domeinen komen niet overeen", points: 3 },{ label: "Uitleg waarom dit fout is", points: 2 },{ label: "Correcte code opgeschreven", points: 2 }], question: "## Python & FFT – Codevraag J\n\n<pre>a = np.fft.fft(input1d_1)\nb = input1d_2\nc = a * b\noutput = np.fft.ifft(c).real</pre>\n\n(7p) Leg uit wat er fout is.", answer: "input1d_2 is tijddomein, a is frequentiedomein. Correct: b = np.fft.fft(input1d_2)." },
    { points: 7, criteria: [{ label: "Doel van de code correct beschreven", points: 2 },{ label: "Fout correct geïdentificeerd: alleen negatieve frequenties verwijderd", points: 3 },{ label: "Uitleg waarom dit vervormd signaal geeft", points: 2 }], question: "## Python & FFT – Codevraag K\n\n<pre>a = np.fft.fft(input1d)\na[len(a)//2:] = 0\noutput = np.fft.ifft(a).real</pre>\n\n(7p) Leg uit wat dit doet.", answer: "Zet negatieve frequenties op nul. Bedoeld als laagdoorlaat maar incorrect: positieve hoge frequenties blijven intact, geeft vervormd signaal." },
    { points: 7, criteria: [{ label: "Doel van np.fft.fftfreq correct uitgelegd", points: 2 },{ label: "Filteroperatie correct beschreven", points: 2 },{ label: "Correcte volgorde FFT → filter → IFFT herkend", points: 2 },{ label: "Eindresultaat correct beschreven", points: 1 }], question: "## Python & FFT – Codevraag L\n\n<pre>N = len(input1d)\na = np.fft.fft(input1d)\nfreqs = np.fft.fftfreq(N, d=1/N)\na[np.abs(freqs) > 10] = 0\noutput = np.fft.ifft(a).real</pre>\n\n(7p) Leg uit wat dit doet.", answer: "Correct laagdoorlaat filter: fftfreq genereert frequentie-as, alles boven 10 Hz wordt nul gezet, IFFT geeft gefilterd signaal." },
    { points: 7, criteria: [{ label: "Fout correct geïdentificeerd als deconvolutie", points: 2 },{ label: "Instabiliteit bij b̂(ω) ≈ 0 correct uitgelegd", points: 3 },{ label: "Correcte aanpak voor convolutie gegeven", points: 2 }], question: "## Python & FFT – Codevraag M\n\n<pre>a = np.fft.fft(input1d_1)\nb = np.fft.fft(input1d_2)\noutput = np.fft.ifft(a / b).real</pre>\n\n(7p) Leg uit wat er fout is.", answer: "Deling = deconvolutie: instabiel als b̂(ω) ≈ 0. Voor convolutie: a * b i.p.v. a / b." },
  ],
};

const REFERENCE = {
  taylor: "Reference style: compute Taylor series by substitution or differentiation, then integrate term-by-term.",
  fourier_normal: "Reference style: Fourier series of polynomials/piecewise functions over symmetric intervals.",
  fourier_complex: "Reference style: Complex Fourier series, compute c0 and cn, handle discontinuities.",
  fourier_transform: "Reference style: Direct computation via definition, split integrals, use complex exponentials.",
  inverse_fourier: "Reference style: Apply Fourier pairs and rules (shift, differentiation) to find f(t) without direct integration.",
  convolutie: "Reference style: Convolution theorem in frequency domain, partial fractions for inverse.",
  filters: "Reference style: Identify filter type from scenario, name it, motivate choice without giving H(omega).",
  laplace: "Reference style: Piecewise Laplace via definition, split integrals, one integration by parts.",
  pde: "Reference style: Apply Fourier/Laplace transform, solve resulting GDV, invert.",
  machtreeks: "Reference style: Power series y=sum c_n x^n, derive recurrence, compute coefficients.",
  python_fft: "Reference style: Interpret numpy FFT code holistically, explain the overall purpose, identify bugs and propose fixes.",
};

const buildSystemPrompt = (topicLabel, ref, prevQuestions) => {
  const prevBlock = prevQuestions.length > 0
    ? "\n\nAL GEBRUIKTE VRAGEN:\n" + prevQuestions.map((q, i) => `${i+1}. ${q.slice(0,200)}`).join("\n")
    : "";
  return `Je bent een wiskundeexaminator voor toegepaste wiskunde op hbo/universitair niveau.\n\nGenereer EEN originele examenvraag over: "${topicLabel}".\n\nReferentiestijl:\n${ref}${prevBlock}\n\nOpmaakregel: gebruik $...$ voor inline wiskunde, $$...$$ voor display-formules. Schrijf in Markdown met ## voor titels en puntwaarden als (Xp).\nStructuur: vraag, dan ---ANTWOORD---, dan oplossing. Schrijf in het Nederlands.`;
};

function useKaTeX() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.__katexReady) { setReady(true); return; }
    const cssHref = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
    const katexSrc = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
    const autoSrc  = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js";
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const l = document.createElement("link"); l.rel="stylesheet"; l.href=cssHref; document.head.appendChild(l);
    }
    const loadScript = (src, cb) => {
      if (document.querySelector(`script[src="${src}"]`)) { cb(); return; }
      const s = document.createElement("script"); s.src=src; s.async=true; s.onload=cb; document.head.appendChild(s);
    };
    loadScript(katexSrc, () => loadScript(autoSrc, () => { window.__katexReady=true; setReady(true); }));
  }, []);
  return ready;
}

function mdToHtml(text, exerciseNum) {
  if (!text) return "";
  let headingReplaced = false;
  const segments = text.split(/(\$\$[\s\S]*?\$\$|<pre>[\s\S]*?<\/pre>)/g);
  return segments.map(seg => {
    if (seg.startsWith("$$")) return `<div class="math-block">${seg}</div>`;
    if (seg.startsWith("<pre>")) {
      const code = seg.slice(5,-6);
      return `<pre style="background:rgba(255,255,255,0.07);border-radius:8px;padding:12px 16px;font-size:13px;overflow-x:auto;color:#e2e8f0;margin:10px 0;font-family:monospace;white-space:pre;">${code}</pre>`;
    }
    return seg.split("\n").map(line => {
      if (line.startsWith("## ")) {
        if (!headingReplaced && exerciseNum !== undefined) { headingReplaced=true; return `<div class="math-heading">Opgave ${exerciseNum}</div>`; }
        return `<div class="math-heading">${line.slice(3).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")}</div>`;
      }
      if (line.trim()==="") return `<div class="math-spacer"></div>`;
      return `<div class="math-line">${line.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")}</div>`;
    }).join("");
  }).join("");
}

function MathText({ text, style: extraStyle, exerciseNum }) {
  const divRef = useRef(null);
  const katexReady = useKaTeX();
  useEffect(() => {
    if (!divRef.current || !katexReady || !window.renderMathInElement) return;
    divRef.current.innerHTML = mdToHtml(text, exerciseNum);
    window.renderMathInElement(divRef.current, {
      delimiters: [{ left:"$$", right:"$$", display:true },{ left:"$", right:"$", display:false }],
      throwOnError: false,
    });
  }, [text, katexReady]);
  return <div ref={divRef} style={{ lineHeight:1.9, ...extraStyle }} />;
}

// ── Criteria scoring component ──────────────────────────────────────────────
function CriteriaScoring({ criteria, onSubmit }) {
  const [checked, setChecked] = useState(() => criteria.map(() => false));

  const toggle = i => setChecked(prev => { const n=[...prev]; n[i]=!n[i]; return n; });
  const earned = criteria.reduce((s,c,i) => s + (checked[i] ? c.points : 0), 0);
  const total  = criteria.reduce((s,c) => s + c.points, 0);
  const pct    = Math.round(earned / total * 100);
  const color  = pct >= 70 ? "#22c55e" : pct >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:12, flexWrap:"wrap" }}>
        <div style={{ fontWeight:700, color:"#a5b4fc", fontSize:12, textTransform:"uppercase", letterSpacing:1, flexShrink:0 }}>Nakijken</div>
        <div style={{ fontSize:11, color:"#f59e0b", lineHeight:1.5 }}><strong>Let op:</strong> De verdeling van punten hier hoeft niet overeen te komen met de verdeling van punten in het tentamen.</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        {criteria.map((c,i) => (
          <label key={i} onClick={() => toggle(i)}
            style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", background: checked[i] ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.04)", border:`1px solid ${checked[i] ? "#6366f1" : "rgba(255,255,255,0.1)"}`, borderRadius:8, padding:"9px 12px", userSelect:"none" }}>
            <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${checked[i] ? "#6366f1" : "#475569"}`, background: checked[i] ? "#6366f1" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:13, color:"white" }}>
              {checked[i] ? "✓" : ""}
            </div>
            <span style={{ flex:1, fontSize:14, color: checked[i] ? "#e2e8f0" : "#94a3b8" }}>{c.label}</span>
            <span style={{ fontSize:13, fontWeight:700, color: checked[i] ? "#a5b4fc" : "#475569", flexShrink:0 }}>{c.points}p</span>
          </label>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(255,255,255,0.06)", borderRadius:10, padding:"10px 16px", marginBottom:14 }}>
        <span style={{ fontSize:14, color:"#94a3b8" }}>Behaald</span>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:22, fontWeight:700, color }}>{earned}</span>
          <span style={{ fontSize:14, color:"#64748b" }}>/ {total}p</span>
          <span style={{ fontSize:12, color, background:`${color}22`, border:`1px solid ${color}44`, borderRadius:6, padding:"2px 8px" }}>{pct}%</span>
        </div>
      </div>
      <button onClick={() => onSubmit(earned, total)}
        style={{ width:"100%", padding:"10px", borderRadius:10, border:"none", background:"#6366f1", color:"white", fontWeight:700, fontSize:14, cursor:"pointer" }}>
        Volgende opgave →
      </button>
    </div>
  );
}

function HistoryItem({ entry }) {
  const [open, setOpen] = useState(false);
  const pct = entry.maxPoints ? Math.round(entry.score / entry.maxPoints * 100) : null;
  const color = pct === null ? "#64748b" : pct >= 70 ? "#22c55e" : pct >= 40 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:12, border:"1px solid rgba(255,255,255,0.1)", overflow:"hidden" }}>
      <div onClick={() => setOpen(o=>!o)} style={{ padding:"14px 20px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";}}
        onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", gap:8, marginBottom:5, flexWrap:"wrap" }}>
            <span style={{ background:"#6366f1", color:"white", borderRadius:6, padding:"2px 10px", fontSize:11, fontWeight:700 }}>{entry.topic}</span>
            {entry.score !== null && entry.score !== undefined
              ? <span style={{ borderRadius:6, padding:"2px 10px", fontSize:11, fontWeight:700, color, background:`${color}11`, border:`1px solid ${color}44` }}>{entry.score}/{entry.maxPoints}p · {pct}%</span>
              : <span style={{ fontSize:11, color:"#64748b" }}>Geen score</span>}
          </div>
          <div style={{ fontSize:13, color:"#94a3b8", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {entry.question.slice(0,110).replace(/<pre>[\s\S]*?<\/pre>/g,"[code]").replace(/\$\$[^$]+\$\$/g,"[formule]").replace(/\$[^$]+\$/g,"[wiskunde]")}…
          </div>
        </div>
        <div style={{ color:"#94a3b8", fontSize:16, userSelect:"none", flexShrink:0 }}>{open?"▲":"▼"}</div>
      </div>
      {open && (
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", padding:"20px 20px 24px" }}>
          <div style={{ fontWeight:700, color:"#a5b4fc", marginBottom:10, fontSize:12, textTransform:"uppercase", letterSpacing:1 }}>Vraag</div>
          <div style={{ fontSize:14, color:"#e2e8f0", marginBottom:20 }}><MathText text={entry.question} /></div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:16 }}>
            <div style={{ fontWeight:700, color:"#a5b4fc", marginBottom:10, fontSize:12, textTransform:"uppercase", letterSpacing:1 }}>Uitwerking</div>
            <div style={{ fontSize:14, color:"#cbd5e1" }}><MathText text={entry.answer} /></div>
          </div>
        </div>
      )}
    </div>
  );
}

const COUNT_OPTIONS = [1, 2, 3, 5];

const FORMULAS = [
  { title:"Fourier-paren", rows:[
    { f:"e^{-at}u(t),\\quad a>0", F:"\\dfrac{1}{a+i\\omega}" },
    { f:"e^{-a|t|},\\quad a>0", F:"\\dfrac{2a}{a^2+\\omega^2}" },
    { f:"t\\,e^{-at}u(t),\\quad a>0", F:"\\dfrac{1}{(a+i\\omega)^2}" },
    { f:"t^n e^{-at}u(t),\\quad a>0", F:"\\dfrac{n!}{(a+i\\omega)^{n+1}}" },
    { f:"e^{-at}\\cos(\\omega_0 t)\\,u(t)", F:"\\dfrac{a+i\\omega}{(a+i\\omega)^2+\\omega_0^2}" },
    { f:"e^{-at}\\sin(\\omega_0 t)\\,u(t)", F:"\\dfrac{\\omega_0}{(a+i\\omega)^2+\\omega_0^2}" },
    { f:"\\delta(t)", F:"1" },
    { f:"1", F:"2\\pi\\,\\delta(\\omega)" },
    { f:"e^{i\\omega_0 t}", F:"2\\pi\\,\\delta(\\omega-\\omega_0)" },
  ]},
  { title:"Fourier-regels", rows:[
    { rule:"Lineariteit", f:"\\alpha f+\\beta g", F:"\\alpha\\hat{f}+\\beta\\hat{g}" },
    { rule:"Tijdverschuiving", f:"f(t-t_0)", F:"e^{-i\\omega t_0}\\hat{f}" },
    { rule:"Frequentieverschuiving", f:"e^{i\\omega_0 t}f", F:"\\hat{f}(\\omega-\\omega_0)" },
    { rule:"Differentiatie tijd", f:"f'(t)", F:"i\\omega\\hat{f}" },
    { rule:"Differentiatie freq.", f:"-it\\,f(t)", F:"\\hat{f}'(\\omega)" },
    { rule:"Schaling", f:"f(at)", F:"\\frac{1}{|a|}\\hat{f}(\\omega/a)" },
    { rule:"Convolutiestelling", f:"(f*g)(t)", F:"\\hat{f}\\cdot\\hat{g}" },
    { rule:"Tijdspiegeling", f:"f(-t)", F:"\\hat{f}(-\\omega)" },
  ]},
  { title:"Definitie", rows:[
    { rule:"Voorwaarts", f:"\\hat{f}(\\omega)", F:"\\int_{-\\infty}^{\\infty}f(t)e^{-i\\omega t}dt" },
    { rule:"Invers", f:"f(t)", F:"\\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}\\hat{f}(\\omega)e^{i\\omega t}d\\omega" },
  ]},
];

function FormulasView() {
  const containerRef = useRef(null);
  const katexReady = useKaTeX();
  useEffect(() => {
    if (!containerRef.current || !katexReady || !window.renderMathInElement) return;
    window.renderMathInElement(containerRef.current, { delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}], throwOnError:false });
  }, [katexReady]);
  return (
    <div ref={containerRef}>
      <div style={{ fontWeight:700, fontSize:17, marginBottom:6, color:"#f1f5f9" }}>Handige formules</div>
      <div style={{ fontSize:13, color:"#94a3b8", marginBottom:20 }}>Fourier-paren en -regels.</div>
      {FORMULAS.map(section => (
        <div key={section.title} style={{ marginBottom:28 }}>
          <div style={{ fontWeight:700, fontSize:13, color:"#a5b4fc", textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>{section.title}</div>
          <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:12, border:"1px solid rgba(255,255,255,0.1)", overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14 }}>
              <thead>
                <tr style={{ background:"rgba(99,102,241,0.15)", borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
                  {section.rows[0].rule !== undefined && <th style={{ padding:"8px 16px", textAlign:"left", color:"#94a3b8", fontWeight:600, fontSize:12, width:"25%" }}>Regel</th>}
                  <th style={{ padding:"8px 16px", textAlign:"left", color:"#94a3b8", fontWeight:600, fontSize:12 }}>f(t)</th>
                  <th style={{ padding:"8px 16px", textAlign:"left", color:"#94a3b8", fontWeight:600, fontSize:12 }}>f̂(ω)</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row,i) => (
                  <tr key={i} style={{ borderBottom: i<section.rows.length-1?"1px solid rgba(255,255,255,0.06)":"none", background: i%2===0?"transparent":"rgba(255,255,255,0.02)" }}>
                    {row.rule !== undefined && <td style={{ padding:"10px 16px", color:"#cbd5e1", fontSize:12 }}>{row.rule}</td>}
                    <td style={{ padding:"10px 16px", color:"#e2e8f0" }}>${row.f}$</td>
                    <td style={{ padding:"10px 16px", color:"#e2e8f0" }}>${row.F}$</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

const MAX_TUTOR_QUESTIONS = 3;

function AskTutor({ exercise }) {
  const [questions, setQuestions] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const remaining = MAX_TUTOR_QUESTIONS - questions.length;

  const handleAsk = useCallback(async () => {
    const q = input.trim();
    if (!q || loading || remaining <= 0) return;
    setInput(""); setLoading(true);
    setQuestions(prev => [...prev, { question:q, answer:null }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`Je bent een behulpzame wiskundetutor. Beantwoord de vraag van de student beknopt. Gebruik $$...$$ voor display-formules en $...$ voor inline. Schrijf in het Nederlands.\n\nOPDRACHT:\n${exercise.question}\n\nUITWERKING:\n${exercise.answer}`,
          messages:[{role:"user", content:q}],
        }),
      });
      const data = await res.json();
      const text = (data.content||[]).map(b=>b.text||"").join("");
      setQuestions(prev => prev.map((item,i) => i===prev.length-1 ? {...item, answer:text} : item));
    } catch {
      setQuestions(prev => prev.map((item,i) => i===prev.length-1 ? {...item, answer:"_Er is een fout opgetreden._"} : item));
    } finally { setLoading(false); }
  }, [input, loading, remaining, exercise]);

  return (
    <div style={{ marginTop:28, borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ fontWeight:700, color:"#a5b4fc", fontSize:12, textTransform:"uppercase", letterSpacing:1 }}>Vraag aan de tutor</div>
        <span style={{ fontSize:11, color: remaining>0?"#94a3b8":"#ef4444", background:"rgba(255,255,255,0.06)", borderRadius:6, padding:"2px 10px" }}>
          {remaining} vraag{remaining!==1?"en":""} over
        </span>
      </div>
      {questions.map((item,i) => (
        <div key={i} style={{ marginBottom:16 }}>
          <div style={{ display:"flex", gap:8, marginBottom:8, alignItems:"flex-start" }}>
            <span style={{ background:"#6366f1", color:"white", borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0, marginTop:1 }}>V</span>
            <div style={{ fontSize:14, color:"#e2e8f0", background:"rgba(99,102,241,0.12)", borderRadius:10, padding:"8px 12px", flex:1 }}>{item.question}</div>
          </div>
          {item.answer===null ? (
            <div style={{ display:"flex", gap:8, alignItems:"center", paddingLeft:30, color:"#64748b", fontSize:13 }}>
              <span style={{ display:"flex", gap:3 }}>
                {[0,1,2].map(j => <span key={j} style={{ width:5, height:5, borderRadius:"50%", background:"#6366f1", display:"inline-block", animation:"bounce 1.2s ease-in-out infinite", animationDelay:`${j*0.2}s` }} />)}
              </span>
              Tutor denkt na…
            </div>
          ) : (
            <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
              <span style={{ background:"#0ea5e9", color:"white", borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0, marginTop:1 }}>A</span>
              <div style={{ fontSize:14, color:"#cbd5e1", background:"rgba(14,165,233,0.08)", border:"1px solid rgba(14,165,233,0.2)", borderRadius:10, padding:"8px 12px", flex:1 }}><MathText text={item.answer} /></div>
            </div>
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div style={{ display:"flex", gap:8 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&handleAsk()}
            placeholder="Stel een vraag over de uitwerking…" disabled={loading}
            style={{ flex:1, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, padding:"9px 14px", color:"#e2e8f0", fontSize:14, outline:"none" }} />
          <button onClick={handleAsk} disabled={!input.trim()||loading}
            style={{ padding:"9px 18px", borderRadius:10, border:"none", background:!input.trim()||loading?"rgba(99,102,241,0.3)":"#6366f1", color:"white", fontWeight:700, fontSize:14, cursor:!input.trim()||loading?"not-allowed":"pointer" }}>
            Vraag
          </button>
        </div>
      )}
      {remaining===0&&!loading && <div style={{ fontSize:13, color:"#64748b", textAlign:"center", padding:"8px 0" }}>Maximum aantal vragen bereikt.</div>}
    </div>
  );
}

function HistoryView({ history }) {
  const [filterTopic, setFilterTopic] = useState("all");
  const [filterScore, setFilterScore] = useState("all");
  const scoreRanges = [
    { key:"all",  label:"Alle scores", color:"#94a3b8" },
    { key:"high", label:"≥ 70%",       color:"#22c55e" },
    { key:"mid",  label:"40–69%",      color:"#f59e0b" },
    { key:"low",  label:"< 40%",       color:"#ef4444" },
    { key:"none", label:"Geen score",  color:"#64748b" },
  ];
  const filtered = history.filter(h => {
    const topicOk = filterTopic==="all" || h.topicId===filterTopic;
    const pct = h.maxPoints ? h.score/h.maxPoints*100 : null;
    const scoreOk = filterScore==="all"
      || (filterScore==="none" && pct===null)
      || (filterScore==="high" && pct!==null && pct>=70)
      || (filterScore==="mid"  && pct!==null && pct>=40 && pct<70)
      || (filterScore==="low"  && pct!==null && pct<40);
    return topicOk && scoreOk;
  });
  const chip = (active, color) => ({ padding:"5px 12px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", border:`1px solid ${active?color:"rgba(255,255,255,0.12)"}`, background:active?`${color}22`:"rgba(255,255,255,0.05)", color:active?color:"#94a3b8", whiteSpace:"nowrap" });
  return (
    <>
      <div style={{ fontWeight:700, fontSize:17, color:"#f1f5f9", marginBottom:14 }}>Geschiedenis</div>
      {history.length > 0 && (
        <div style={{ marginBottom:18, display:"flex", flexDirection:"column", gap:10 }}>
          <div>
            <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:1, marginBottom:7 }}>Onderwerp</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {["all",...TOPICS.map(t=>t.id)].map(id => {
                const label = id==="all"?"Alle onderwerpen":TOPICS.find(t=>t.id===id)?.label;
                return <button key={id} onClick={()=>setFilterTopic(id)} style={chip(filterTopic===id,"#6366f1")}>{label}</button>;
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:1, marginBottom:7 }}>Score</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {scoreRanges.map(s => <button key={s.key} onClick={()=>setFilterScore(s.key)} style={chip(filterScore===s.key,s.color)}>{s.label}</button>)}
            </div>
          </div>
        </div>
      )}
      {history.length===0
        ? <div style={{ textAlign:"center", color:"#64748b", padding:"60px 0", fontSize:15 }}>Nog geen oefeningen gemaakt.</div>
        : filtered.length===0
          ? <div style={{ textAlign:"center", color:"#64748b", padding:"40px 0", fontSize:14 }}>Geen opgaven gevonden.</div>
          : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ fontSize:12, color:"#64748b", marginBottom:2 }}>{filtered.length} van {history.length} opgaven</div>
              {filtered.map(h => <HistoryItem key={h.id} entry={h} />)}
            </div>
      }
    </>
  );
}

export default function App() {
  const [view,          setView]          = useState("practice");
  const [selectedIds,   setSelectedIds]   = useState([TOPICS[0].id]);
  const [menuOpen,      setMenuOpen]      = useState(true);
  const [exerciseCount, setExerciseCount] = useState(2);
  const [history,       setHistory]       = useState([]);
  const [error,         setError]         = useState(null);
  const [exercise,      setExercise]      = useState(null);
  const [phase,         setPhase]         = useState("idle");
  const [answerVisible, setAnswerVisible] = useState(false);
  const [elapsed,       setElapsed]       = useState(0);
  const [paused,        setPaused]        = useState(false);

  const queueRef = useRef([]);
  const usedRef  = useRef({});
  const timerRef = useRef(null);
  useKaTeX();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .math-heading{font-weight:700;font-size:15px;color:#e2e8f0;margin-top:14px;margin-bottom:4px;}
      .math-spacer{height:6px;}
      .math-line{margin-bottom:2px;}
      .math-block{margin:8px 0;}
      .katex-display{overflow-x:auto;overflow-y:hidden;}
      @keyframes bounce{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-5px);}}
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (phase !== "active" || paused) { clearTimeout(timerRef.current); return; }
    timerRef.current = setTimeout(() => setElapsed(e => e+1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [phase, elapsed, paused]);

  const fetchExercise = useCallback(async (topicId) => {
    const topic = TOPICS.find(t => t.id===topicId);
    if (PREDEFINED[topicId]) {
      const pool = PREDEFINED[topicId];
      const usedIdxs = usedRef.current[topicId] || [];
      const rem = pool.map((_,i)=>i).filter(i=>!usedIdxs.includes(i));
      const candidates = rem.length>0 ? rem : pool.map((_,i)=>i);
      const pick = candidates[Math.floor(Math.random()*candidates.length)];
      usedRef.current[topicId] = rem.length>1 ? [...usedIdxs,pick] : [];
      const ex = pool[pick];
      return { id:Date.now()+Math.random(), topicId, topic:topic.label, points:ex.points, criteria:ex.criteria||null, question:ex.question, answer:ex.answer };
    }
    const prev = usedRef.current[topicId]||[];
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1400, system:buildSystemPrompt(topic.label,REFERENCE[topicId],prev), messages:[{role:"user",content:"Genereer de vraag nu."}] }),
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const full = (data.content||[]).map(b=>b.text||"").join("");
    const idx  = full.indexOf("---ANTWOORD---");
    const q = (idx>=0?full.slice(0,idx):full).trim();
    const a = (idx>=0?full.slice(idx+14):"").trim();
    const sum = (q.match(/\((\d+)p\)/g)||[]).reduce((acc,m)=>acc+parseInt(m.replace(/\D/g,""),10),0);
    usedRef.current[topicId]=[...prev,q.slice(0,300)];
    return { id:Date.now()+Math.random(), topicId, topic:topic.label, points:sum>0?sum:topic.points, criteria:null, question:q, answer:a };
  }, []);

  const loadNext = useCallback(async () => {
    if (queueRef.current.length===0) { setPhase("done"); setMenuOpen(true); return; }
    const nextId = queueRef.current.shift();
    setPhase("loading"); setExercise(null); setAnswerVisible(false); setElapsed(0); setPaused(false); setError(null);
    try {
      const ex = await fetchExercise(nextId);
      setExercise(ex); setPhase("active");
    } catch { setError("Kon de vraag niet genereren. Probeer het opnieuw."); setPhase("idle"); }
  }, [fetchExercise]);

  const buildQueue = useCallback((ids, perTopic) => {
    const q=[];
    for (let i=0;i<perTopic;i++) ids.forEach(id=>q.push(id));
    return q;
  }, []);

  const handleStop = useCallback(() => {
    queueRef.current=[];
    setPhase("idle"); setExercise(null); setAnswerVisible(false); setElapsed(0); setPaused(false); setError(null); setMenuOpen(true);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (phase==="active") { handleStop(); return; }
    const queue = buildQueue(selectedIds, exerciseCount);
    queueRef.current=queue;
    setMenuOpen(false); setPhase("idle"); setExercise(null); setAnswerVisible(false); setElapsed(0); setPaused(false); setError(null);
    await loadNext();
  }, [phase, selectedIds, exerciseCount, loadNext, buildQueue, handleStop]);

  const handleCriteriaSubmit = useCallback((earned, maxPts) => {
    if (!exercise) return;
    setHistory(h => {
      const existing = h.findIndex(e=>e.question===exercise.question);
      const updated = { ...exercise, score:earned, maxPoints:maxPts };
      if (existing>=0) { const n=[...h]; n[existing]=updated; return n; }
      return [updated,...h];
    });
    loadNext();
  }, [exercise, loadNext]);

  const handleSkip = useCallback(() => { loadNext(); }, [loadNext]);

  const total = history.length;
  const scored = history.filter(h=>h.score!==null&&h.score!==undefined);
  const totalEarned = scored.reduce((s,h)=>s+h.score,0);
  const totalMax    = scored.reduce((s,h)=>s+h.maxPoints,0);
  const avgPct = totalMax>0 ? Math.round(totalEarned/totalMax*100) : null;

  const fmt = s => { const a=Math.abs(s); return `${Math.floor(a/60)}:${String(a%60).padStart(2,"0")}`; };
  const totalExercises = selectedIds.length * exerciseCount;
  const doneCount = exercise ? totalExercises-queueRef.current.length-1 : totalExercises-queueRef.current.length;

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:"linear-gradient(135deg,#0f172a 0%,#1e293b 100%)", fontFamily:"'Segoe UI',system-ui,sans-serif", color:"#e2e8f0" }}>
      <div style={{ background:"rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.1)", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, flexShrink:0 }}>
        <div>
          <div style={{ fontWeight:700, fontSize:17, color:"#f1f5f9" }}>Wiskunde 2.3 – Fourier Transformaties</div>
          <div style={{ fontSize:12, color:"#94a3b8" }}>Oefenen tot je het echt kan!</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[["practice","Oefenen"],["history",`Geschiedenis (${total})`],["formulas","Handige formules"]].map(([v,l]) => (
            <button key={v} onClick={()=>setView(v)} style={{ padding:"7px 16px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, background:view===v?"#6366f1":"rgba(255,255,255,0.08)", color:view===v?"white":"#94a3b8" }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px 16px 8px" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          {view==="formulas" && <FormulasView />}
          {view==="history" && <HistoryView history={history} />}
          {view==="practice" && (
            <>
              {total>0 && (
                <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
                  {[["Opgaven",total,"#6366f1"],["Gescoord",scored.length,"#a5b4fc"]].map(([l,v,c]) => (
                    <div key={l} style={{ background:"rgba(255,255,255,0.06)", borderRadius:10, padding:"7px 14px", flex:1, minWidth:70, textAlign:"center", border:`1px solid ${c}33` }}>
                      <div style={{ fontSize:19, fontWeight:700, color:c }}>{v}</div>
                      <div style={{ fontSize:11, color:"#94a3b8" }}>{l}</div>
                    </div>
                  ))}
                  {totalMax>0 && (
                    <>
                      <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:10, padding:"7px 14px", flex:1, minWidth:70, textAlign:"center", border:"1px solid rgba(255,255,255,0.1)" }}>
                        <div style={{ fontSize:19, fontWeight:700, color:"#e2e8f0" }}>{totalEarned}/{totalMax}</div>
                        <div style={{ fontSize:11, color:"#94a3b8" }}>Punten</div>
                      </div>
                      <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:10, padding:"7px 14px", flex:1, minWidth:70, textAlign:"center", border:`1px solid ${avgPct>=70?"#22c55e":avgPct>=40?"#f59e0b":"#ef4444"}33` }}>
                        <div style={{ fontSize:19, fontWeight:700, color:avgPct>=70?"#22c55e":avgPct>=40?"#f59e0b":"#ef4444" }}>{avgPct}%</div>
                        <div style={{ fontSize:11, color:"#94a3b8" }}>Gemiddeld</div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {error && <div style={{ background:"#450a0a", border:"1px solid #ef4444", borderRadius:10, padding:14, marginBottom:16, color:"#fca5a5" }}>{error}</div>}
              {phase==="loading" && (
                <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:16, padding:40, border:"1px solid rgba(255,255,255,0.1)", textAlign:"center", color:"#94a3b8", marginBottom:16 }}>
                  Vraag wordt geladen…
                </div>
              )}
              {phase==="done" && (
                <div style={{ background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:16, padding:28, textAlign:"center", color:"#a5b4fc", marginBottom:16 }}>
                  <div style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>Sessie voltooid!</div>
                  <div style={{ fontSize:14, color:"#94a3b8" }}>Selecteer onderwerpen en klik Start voor een nieuwe sessie.</div>
                </div>
              )}
              {phase==="active" && exercise && (
                <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:16, padding:22, border:"1px solid rgba(255,255,255,0.1)", marginBottom:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18, gap:12, flexWrap:"wrap" }}>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                      <span style={{ background:"#6366f1", color:"white", borderRadius:6, padding:"3px 10px", fontSize:12, fontWeight:700 }}>{exercise.topic}</span>
                      <span style={{ background:"rgba(255,255,255,0.1)", color:"#cbd5e1", borderRadius:6, padding:"3px 10px", fontSize:12 }}>{exercise.points}p</span>
                      <span style={{ background:"rgba(255,255,255,0.07)", color:"#94a3b8", borderRadius:6, padding:"3px 10px", fontSize:12 }}>{doneCount+1}/{totalExercises}</span>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"flex-end" }}>
                        <div style={{ fontSize:22, fontWeight:700, color:paused?"#64748b":elapsed>exercise.points*60?"#ef4444":"#f59e0b", fontVariantNumeric:"tabular-nums" }}>
                          {elapsed>exercise.points*60?"−":""}{fmt(exercise.points*60-elapsed)}
                        </div>
                        <button onClick={()=>setPaused(p=>!p)}
                          style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:6, padding:"3px 8px", cursor:"pointer", color:paused?"#a5b4fc":"#94a3b8", fontSize:14, lineHeight:1 }}>
                          {paused?"▶":"⏸"}
                        </button>
                      </div>
                      <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>{paused?"gepauzeerd":`indicatie: ${exercise.points} min`}</div>
                    </div>
                  </div>
                  <div style={{ fontSize:15, color:"#e2e8f0", marginBottom:18 }}>
                    <MathText text={exercise.question} exerciseNum={doneCount+1} />
                  </div>
                  {!answerVisible && (
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      <button onClick={()=>setAnswerVisible(true)}
                        style={{ padding:"9px 22px", borderRadius:10, border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#e2e8f0", cursor:"pointer", fontWeight:600, fontSize:14 }}>
                        Toon antwoord
                      </button>
                      <button onClick={handleSkip}
                        style={{ padding:"9px 22px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"#64748b", cursor:"pointer", fontWeight:600, fontSize:14 }}>
                        Sla over →
                      </button>
                    </div>
                  )}
                  {answerVisible && (
                    <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:18 }}>
                      <div style={{ fontWeight:700, color:"#a5b4fc", marginBottom:12, fontSize:12, textTransform:"uppercase", letterSpacing:1 }}>Uitwerking</div>
                      <div style={{ fontSize:14, color:"#cbd5e1" }}><MathText text={exercise.answer} /></div>
                      {exercise.criteria
                        ? <CriteriaScoring criteria={exercise.criteria} onSubmit={handleCriteriaSubmit} />
                        : (
                          <div style={{ marginTop:22, fontSize:13, color:"#64748b" }}>
                            <button onClick={()=>handleCriteriaSubmit(null,null)}
                              style={{ padding:"10px 24px", borderRadius:10, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.07)", color:"#94a3b8", fontWeight:600, cursor:"pointer", fontSize:14 }}>
                              Volgende opgave →
                            </button>
                          </div>
                        )
                      }
                      <AskTutor exercise={exercise} />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {view==="practice" && (
        <div style={{ flexShrink:0, borderTop:"1px solid rgba(255,255,255,0.1)", background:"rgba(15,23,42,0.97)", backdropFilter:"blur(10px)", padding:"14px 16px" }}>
          <div style={{ maxWidth:820, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:8 }}>
              <button onClick={()=>setMenuOpen(o=>!o)}
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:6, padding:"2px 18px", cursor:"pointer", color:"#94a3b8", fontSize:12, lineHeight:1.6 }}>
                {menuOpen?"▼":"▲"}
              </button>
            </div>
            {menuOpen && (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>
                    Onderwerpen ({selectedIds.length} geselecteerd)
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    {[["Alles",()=>setSelectedIds(TOPICS.map(t=>t.id))],["Geen",()=>setSelectedIds([])],["Willekeurig",()=>setSelectedIds([...TOPICS].sort(()=>Math.random()-.5).slice(0,3).map(t=>t.id))]].map(([l,fn])=>(
                      <button key={l} onClick={fn} style={{ padding:"3px 10px", borderRadius:6, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.07)", color:"#94a3b8", cursor:"pointer", fontSize:11, fontWeight:600 }}>{l}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
                  {TOPICS.map(t => {
                    const sel = selectedIds.includes(t.id);
                    return <button key={t.id} onClick={()=>setSelectedIds(prev=>prev.includes(t.id)?prev.filter(x=>x!==t.id):[...prev,t.id])}
                      style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${sel?"#6366f1":"rgba(255,255,255,0.12)"}`, background:sel?"#6366f1":"rgba(255,255,255,0.05)", color:sel?"white":"#cbd5e1", fontWeight:sel?700:400, fontSize:13, cursor:"pointer" }}>
                      {t.label}
                    </button>;
                  })}
                </div>
                <div style={{ fontSize:11, color:"#94a3b8", marginBottom:8, fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>Oefeningen per onderwerp</div>
                <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                  {COUNT_OPTIONS.map(n => (
                    <button key={n} onClick={()=>setExerciseCount(n)}
                      style={{ padding:"6px 16px", borderRadius:8, border:`1px solid ${exerciseCount===n?"#6366f1":"rgba(255,255,255,0.12)"}`, background:exerciseCount===n?"#6366f1":"rgba(255,255,255,0.05)", color:exerciseCount===n?"white":"#cbd5e1", fontWeight:exerciseCount===n?700:400, fontSize:13, cursor:"pointer" }}>
                      {n}
                    </button>
                  ))}
                </div>
              </>
            )}
            <button onClick={handleGenerate} disabled={phase==="loading"||selectedIds.length===0}
              style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background:phase==="active"?"#ef4444":(phase==="loading"||selectedIds.length===0)?"#4338ca":"#6366f1", color:"white", fontWeight:700, fontSize:15, cursor:(phase==="loading"||selectedIds.length===0)?"not-allowed":"pointer", opacity:selectedIds.length===0?0.5:1, boxShadow:phase==="active"?"0 4px 15px rgba(239,68,68,0.4)":"0 4px 15px rgba(99,102,241,0.4)" }}>
              {phase==="loading"?"Bezig…":phase==="active"?"Beëindig oefensessie":selectedIds.length===0?"Selecteer een onderwerp":`Start oefensessie (${selectedIds.length} onderwerp${selectedIds.length!==1?"en":""} × ${exerciseCount} = ${selectedIds.length*exerciseCount} oefeningen)`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}