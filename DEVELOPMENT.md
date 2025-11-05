# Development Guide

Guide complet pour le développement sur ce projet Next.js 16 avec TypeScript.

## Table des matières

- [Scripts NPM](#scripts-npm)
- [Configuration Prettier](#configuration-prettier)
- [Configuration ESLint](#configuration-eslint)
- [Hooks Git (Husky + lint-staged)](#hooks-git-husky--lint-staged)
- [Architecture TypeScript](#architecture-typescript)
- [Variables d'environnement](#variables-denvironnement)

---

## Scripts NPM

Scripts disponibles pour le développement :

```bash
# Développement
npm run dev              # Lance le serveur de développement

# Build & Production
npm run build            # Build de production
npm run start            # Lance l'application en mode production

# Code Quality
npm run lint             # Vérifie le code avec ESLint
npm run lint:fix         # Corrige automatiquement les erreurs ESLint

# TypeScript
npm run type-check       # Vérifie les types TypeScript sans build

# Formatting
npm run format           # Formate tous les fichiers avec Prettier
npm run format:check     # Vérifie le formatage sans modifier les fichiers

# Vérification complète
npm run check-all        # Exécute type-check + lint + format:check
```

---

## Configuration Prettier

### Fichiers de configuration

- `.prettierrc` : Configuration Prettier
- `.prettierignore` : Fichiers à ignorer

### Règles principales

- **Semi-colons** : Activés
- **Quotes** : Double quotes
- **Tab width** : 2 espaces
- **Print width** : 100 caractères
- **Trailing commas** : ES5
- **Plugin Tailwind** : Tri automatique des classes CSS

### Utilisation

```bash
# Formater tout le projet
npm run format

# Vérifier le formatage
npm run format:check
```

---

## Configuration ESLint

### Configuration avancée

Le projet utilise **ESLint v9** avec la nouvelle configuration flat.

**Fichier** : `eslint.config.mjs`

### Règles TypeScript strictes

#### `@typescript-eslint/no-explicit-any: "error"`

- **Pourquoi** : Force le typage explicite au lieu d'utiliser `any`
- **Impact** : Améliore la sécurité des types et prévient les bugs
- **Exemple** :

  ```typescript
  // ❌ Interdit
  function process(data: any) {}

  // ✅ Correct
  function process(data: User) {}
  ```

#### `@typescript-eslint/no-unused-vars: "error"`

- **Pourquoi** : Détecte les variables/imports inutilisés
- **Exception** : Les variables commençant par `_` sont autorisées
- **Exemple** :

  ```typescript
  // ❌ Interdit
  const unused = 42;

  // ✅ Correct si vraiment nécessaire
  const _unused = 42;
  ```

#### `@typescript-eslint/consistent-type-imports: "error"`

- **Pourquoi** : Sépare les imports de types des imports de valeurs
- **Impact** : Améliore le tree-shaking et la lisibilité
- **Exemple** :

  ```typescript
  // ❌ Interdit
  import { User } from "@/types";

  // ✅ Correct
  import type { User } from "@/types";
  ```

### Règles React

#### `react-hooks/rules-of-hooks: "error"`

- Force le respect des règles des hooks React
- Les hooks doivent être appelés au top-level

#### `react-hooks/exhaustive-deps: "warn"`

- Avertit sur les dépendances manquantes dans useEffect/useCallback
- Aide à prévenir les bugs de synchronisation

### Règles générales de qualité

#### `no-console: "warn"`

- Avertit sur l'utilisation de `console.log`
- Exceptions : `console.warn` et `console.error` sont autorisés
- **Pourquoi** : Évite les logs en production

#### `prefer-const: "error"`

- Force l'utilisation de `const` quand une variable n'est pas réassignée
- Améliore la lisibilité et prévient les modifications accidentelles

#### `eqeqeq: "error"`

- Force l'utilisation de `===` et `!==` au lieu de `==` et `!=`
- Évite les conversions de types implicites dangereuses

#### `curly: "error"`

- Force l'utilisation des accolades pour tous les blocs
- Améliore la lisibilité et prévient les erreurs

### Intégration avec Prettier

ESLint est configuré pour ne pas entrer en conflit avec Prettier grâce à `eslint-config-prettier`.

---

## Hooks Git (Husky + lint-staged)

### Configuration automatique pre-commit

Avant chaque commit, les actions suivantes sont **automatiquement** exécutées :

1. **ESLint** : Vérifie et corrige les erreurs sur les fichiers modifiés
2. **Prettier** : Formate les fichiers modifiés
3. **Si des erreurs persistent** : Le commit est bloqué

### Fichiers concernés

**JavaScript/TypeScript** (`*.{js,jsx,ts,tsx}`) :

- `eslint --fix`
- `prettier --write`

**Autres fichiers** (`*.{json,md,mdx,css,html,yml,yaml}`) :

- `prettier --write`

### Fichiers de configuration

- `.husky/pre-commit` : Hook Git
- `package.json` (section `lint-staged`) : Configuration lint-staged

### Avantages

- ✅ Code toujours formaté correctement
- ✅ Pas d'erreurs ESLint en production
- ✅ Qualité du code maintenue automatiquement
- ✅ Moins de commentaires "fix formatting" en code review

---

## Architecture TypeScript

### Structure des types

```
src/types/
├── index.ts          # Point d'entrée central pour tous les types
├── common.ts         # Types communs réutilisables
├── api.ts            # Types pour les API responses
└── components.ts     # Types pour les props de composants
```

### Import des types

**✅ Toujours importer depuis `@/types`** :

```typescript
import type { User, ApiResponse, ButtonProps } from "@/types";
```

### Types disponibles

#### Types communs (`common.ts`)

- `Nullable<T>`, `Optional<T>`, `Maybe<T>` : Gestion des valeurs nullables
- `Status` : États asynchrones (`"idle" | "loading" | "success" | "error"`)
- `AsyncState<T>` : État complet d'une opération async
- `PaginationParams`, `PaginatedResponse<T>` : Pagination
- `ApiError` : Structure d'erreur API standardisée
- `SortParams<T>` : Tri avec ordre ascendant/descendant

#### Types API (`api.ts`)

- `ApiResponse<T>` : Wrapper de réponse API
- `ApiErrorResponse` : Réponse d'erreur API
- `User`, `Post` : Exemples de modèles (à adapter)
- Types de réponses : `GetUsersResponse`, `CreateUserResponse`, etc.

#### Types de composants (`components.ts`)

- `BaseComponentProps` : Props de base (className, children)
- `ButtonProps` : Props pour boutons avec variants
- `CardProps`, `ModalProps` : Props de composants UI
- `FormFieldProps`, `InputProps`, `SelectProps` : Props de formulaires
- `TableProps<T>` : Props de tableau générique

### Bonnes pratiques

1. **Toujours utiliser `type` pour les imports de types** :

   ```typescript
   import type { User } from "@/types"; // ✅
   import { User } from "@/types"; // ❌
   ```

2. **Créer des types spécifiques plutôt que d'utiliser `any`** :

   ```typescript
   // ❌ À éviter
   const data: any = await fetch();

   // ✅ Préféré
   const data: User = await fetch();
   ```

3. **Utiliser les types génériques pour la réutilisabilité** :
   ```typescript
   const users: AsyncState<User[]> = { status: "loading", data: null, error: null };
   ```

---

## Variables d'environnement

### Configuration avec Zod

Le projet utilise **Zod** pour valider les variables d'environnement au démarrage.

**Fichier** : `src/config/env.ts`

### Fichiers

- `.env.example` : Template avec toutes les variables (committé)
- `.env.local` : Vos variables locales (ignoré par git)

### Utilisation

```typescript
import { env, isDevelopment, isProduction } from "@/config/env";

// Accès type-safe aux variables
console.log(env.NEXT_PUBLIC_APP_URL);

// Helpers
if (isDevelopment) {
  console.log("Mode développement");
}
```

### Ajouter une nouvelle variable

1. Ajoutez-la dans `.env.example` avec un commentaire
2. Ajoutez-la dans le schéma Zod dans `src/config/env.ts`
3. Ajoutez-la dans votre `.env.local`

**Exemple** :

```typescript
// Dans src/config/env.ts
const envSchema = z.object({
  // ... autres variables
  NEW_API_KEY: z.string().min(10).describe("Clé API pour le service externe"),
});
```

### Variables publiques vs privées

- **`NEXT_PUBLIC_*`** : Accessibles côté client (navigateur)
- **Autres** : Accessibles uniquement côté serveur

⚠️ **Ne jamais mettre de secrets dans les variables `NEXT_PUBLIC_*`** !

### Validation automatique

Le schéma Zod valide automatiquement les variables au démarrage :

- ✅ Variables requises présentes
- ✅ Format valide (URL, longueur minimale, etc.)
- ❌ Si invalide → Erreur explicite avec le problème

---

## Workflow de développement recommandé

### Avant de commit

```bash
npm run check-all
```

Cette commande vérifie :

1. TypeScript (types corrects)
2. ESLint (pas d'erreurs de lint)
3. Prettier (code formaté)

### En cas d'erreur

```bash
# Corriger automatiquement ESLint
npm run lint:fix

# Formater le code
npm run format

# Re-vérifier
npm run check-all
```

### Cycle de développement

1. **Développer** : Écrivez votre code
2. **Vérifier** : `npm run check-all` ou laissez Husky vérifier au commit
3. **Commit** : Les hooks git corrigent automatiquement le formatage
4. **Push** : Code propre et sans erreurs !

---

## Support

Pour toute question sur la configuration du projet, consultez :

- Configuration Prettier : `.prettierrc`
- Configuration ESLint : `eslint.config.mjs`
- Configuration Husky : `.husky/pre-commit`
- Types TypeScript : `src/types/`
- Variables d'env : `src/config/env.ts`

**Bon développement !** 🚀
