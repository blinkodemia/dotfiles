return {
	"folke/which-key.nvim",
	"EdenEast/nightfox.nvim",

	-- LSP
	"williamboman/mason.nvim",
	"williamboman/mason-lspconfig.nvim",
	"neovim/nvim-lspconfig",

	-- Treesitter
	{ "nvim-treesitter/nvim-treesitter", build = ":TSUpdate" },

	-- coq_nvim
	"ms-jpq/coq_nvim",
	"ms-jpq/coq.artifacts",
	"ms-jpq/coq.thirdparty",

	-- Colorizer
	"NvChad/nvim-colorizer.lua",

	-- Conform
	"stevearc/conform.nvim",

	-- Autoindent
	"vidocqh/auto-indent.nvim",

	-- Autopairs
	{ "windwp/nvim-autopairs", event = "InsertEnter" },

	-- CHADtree
	{ "ms-jpq/chadtree", build = "python3 -m chadtree deps" },

	-- Statusline
	"freddiehaddad/feline.nvim",
	"nvim-tree/nvim-web-devicons",

	-- Git provider
	"lewis6991/gitsigns.nvim",

	{ "nanozuki/tabby.nvim", event = "VimEnter" },
}
