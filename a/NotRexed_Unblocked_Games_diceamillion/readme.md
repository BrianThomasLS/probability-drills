# Dice a Million — Modding Guide

## Folder Structure

Your mod needs to be its own folder containing a `mod.json` and a `sprites/` folder:

```
your_mod_name/
├── mod.json
└── sprites/
    └── your_die.png
```

---

## mod.json Fields

### Top Level

| Field | Description |
|-------|-------------|
| `name` | Display name of your mod |
| `author` | Your name |
| `version` | Version string, e.g. `"1.0.0"` |
| `description` | Short description of the mod |
| `dice` | Array of custom dice (can be empty `[]`) |
| `rings` | Array of custom rings (can be empty `[]`) |

---

### Dice Fields

| Field | Description |
|-------|-------------|
| `ide` | Unique internal ID for the die. Must be unique across all mods. |
| `rarity` | How rare it is. `1` = common, higher = rarer |
| `prio` | Priority/weight for spawning. Higher = shows up more |
| `sprite` | Path to the die image, relative to your mod folder |
| `faces` | Array of face objects, each with a `value` |
| `faces_desc` | Text shown describing the faces, e.g. `"[spr_dice_icon,0] 10/20/30"` |
| `tag` | Array of tags, e.g. `["faces_even"]` |
| `kw` | Keywords shown in the tooltip, e.g. `["face"]` |
| `effect` | The effect object (see below) |
| `title` | Display name of the die |
| `description` | Tooltip description |

---

### Ring Fields

| Field | Description |
|-------|-------------|
| `ide` | Unique internal ID for the ring |
| `rarity` | How rare it is |
| `prio` | Priority/weight for spawning |
| `func` | When the ring triggers — e.g. `"mid"` |
| `sprite_small` | Path to small ring sprite |
| `sprite_big` | Path to large ring sprite |
| `kw` | Keywords |
| `tag` | Tags |
| `effect` | The effect object (see below) |
| `title` | Display name |
| `description` | Tooltip description |

---

### Effect Object

```json
{ "type": "mult_all", "value": 2 }
```

`type` controls what the effect does, `value` is the number it uses.

---

## Example mod.json

```json
{
    "name": "My Cool Mod",
    "author": "YourName",
    "version": "1.0.0",
    "description": "Adds a cool die",
    "dice": [
        {
            "ide": "my_cool_die",
            "rarity": 1,
            "prio": 5,
            "sprite": "sprites/my_die.png",
            "faces": [
                {"value": 1},
                {"value": 2},
                {"value": 3}
            ],
            "faces_desc": "[spr_dice_icon,0] 1/2/3",
            "tag": ["faces_even"],
            "kw": ["face"],
            "effect": { "type": "mult_all", "value": 2 },
            "title": "Cool Die",
            "description": "Multiplies all dice by 2."
        }
    ],
    "rings": []
}
```

---

## Uploading to GitHub & Getting a jsDelivr Link

### Step 1 — Create a GitHub repo

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it something like `my-dice-mod`, set it to **Public**, click **Create repository**

### Step 2 — Upload your mod files

1. In your new repo, click **Add file** → **Upload files**
2. Upload your entire mod folder (`your_mod_name/mod.json`, `your_mod_name/sprites/your_die.png`, etc.)
3. Click **Commit changes**

### Step 3 — Get your jsDelivr link

jsDelivr serves files directly from GitHub repos. The URL format is:

```
https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@latest/your_mod_name/mod.json
```

For example, if your GitHub username is `cooldev` and your repo is `my-dice-mod`:

```
https://cdn.jsdelivr.net/gh/cooldev/my-dice-mod@latest/your_mod_name/mod.json
```

> **Tip:** Use `@latest` to always get the newest version, or replace it with a specific tag like `@1.0.0` to lock to a version.

### Step 4 — Add to modlist.txt

Add your mod folder name to `modlist.txt`, one per line:

```
your_mod_name
```

---

## Sprite Guidelines

- Use PNG format
- Keep sprites small and pixel-art friendly to match the game's style
- Die sprites should be square
- Ring sprites need two sizes: `sprite_small` and `sprite_big`
