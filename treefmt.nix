{
  projectRootFile = "flake.nix";

  # Lock files are machine-generated; reformatting them just churns diffs.
  settings.global.excludes = [ "pnpm-lock.yaml" "flake.lock" ];

  programs.nixpkgs-fmt.enable = true;
  programs.prettier.enable = true;
}
