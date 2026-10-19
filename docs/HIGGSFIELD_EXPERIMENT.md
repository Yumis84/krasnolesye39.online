# Krasnolesye ONLINE V4: Higgsfield source experiment

This branch is an experiment only. Do not deploy to production or merge to main without approval. krasnolesye39.ru and krasnolesye39.rf are not modified.

## Export a source clip

The source is the **real local index.html**, including the V4 experimental clock overlay. The GitHub Actions workflow `Render Higgsfield source clip (manual)` produces a 1280x720 MP4 at 12 fps, approximately 10 seconds, and uploads it as a workflow artifact.

To render locally: `npm ci`, `npx playwright install chromium`, install ffmpeg, run `python3 -m http.server 8765`, then `node scripts/render-intro.cjs`.

The MP4 is a **visual reference only**. The original site uses Web Audio and the screenshot renderer does not capture browser audio. Preserve original audio separately when integrating. The final approved real clock-chime recording has not been located in this repository.

## Higgsfield Genjutsu

Genjutsu motion transfer requires the exported video plus a confirmed reference image. The video alone is not enough. Model `hf_mult_motion_control` accepts `video` and `image` roles. Verify current model entitlement and credit cost before submitting. Never retry a denied paid generation automatically.

Do not bake AI-generated text or logos into the website: keep actual typography, branding, accessibility and redirect behavior in HTML. Review all results before publishing. A generated MP4 is not itself an approved website replacement.
