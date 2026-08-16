# Run a command inside the flake devshell (node/pnpm live there, not globally).
in_shell := "nix develop --command"

# List available recipes.
default:
    @just --list

# Install dependencies.
install:
    {{ in_shell }} pnpm install

# Run the local dev server for testing changes.
dev:
    {{ in_shell }} pnpm start

# Build the production site.
build:
    {{ in_shell }} pnpm build

# Serve the production build locally.
serve:
    {{ in_shell }} pnpm serve

# Remove generated build artifacts.
clean:
    {{ in_shell }} pnpm clear

# Format nix files.
fmt:
    nix fmt
