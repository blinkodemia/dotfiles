vim.g.mapleader = " "
vim.opt.termguicolors = true
vim.opt.background = "dark"
vim.cmd("set ttyfast")
vim.cmd("set number relativenumber")
vim.loader.enable()

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
	vim.fn.system({
		"git",
		"clone",
		"--filter=blob:none",
		"https://github.com/folke/lazy.nvim.git",
		"--branch=stable", -- latest stable release
		lazypath,
	})
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup("plugins")
require("which-key").setup({
	init = function()
		vim.o.timeout = true
		vim.o.timeoutlen = 300
	end,
	opts = {},
})
vim.cmd("colorscheme oxocarbon")

-- Lualine
require("lualine").setup({})

-- LSP
require("mason").setup()
require("mason-lspconfig").setup({
	ensure_installed = {
		javascript = "prettierd",
		"eslint",
		typescript = "prettierd",
		"eslint",
		html = "prettierd",
		"eslint",
		lua = "luals",
		python = "black",
		c = "clangd",
		cpp = "clangd",
	},
})
require("lspconfig").lua_ls.setup(coq.lsp_ensure_capabilities())
require("lspconfig").clangd.setup(coq.lsp_ensure_capabilities())
require("lspconfig").rust_analyzer.setup(coq.lsp_ensure_capabilities())
require("lspconfig").eslint.setup(coq.lsp_ensure_capabilities())

-- Treesitter
require("nvim-treesitter").setup({})
require("nvim-treesitter.configs").setup({
	highlight = {
		enable = true,
		additional_vim_regex_highlighting = { "org" },
	},
	ensure_installed = { "org" },
})

-- Telescope
require("telescope").setup({
	defaults = {
		mappings = {
			i = {
				["<C-h>"] = "which_key",
			},
		},
	},
	extensions = {
		fzf = {
			fuzzy = true,
			override_generic_sorter = true,
			override_file_sorter = true,
			case_mode = "smart_case",
		},
	},
})
require("telescope").load_extension("fzf")
require("colorizer").setup()

-- Formatters
require("conform").setup({
	formatters_by_ft = {
		javascript = { "prettierd" },
		typescript = { "prettierd" },
		javascriptreact = { "prettierd" },
		typescriptreact = { "prettierd" },
		svelte = { "prettierd" },
		css = { "prettierd" },
		html = { "prettierd" },
		json = { "prettierd" },
		yaml = { "prettierd" },
		markdown = { "prettierd" },
		graphql = { "prettierd" },
		lua = { "stylua" },
		python = { "isort", "black" },
	},
	format_on_save = {
		lsp_fallback = true,
		async = false,
		timeout_ms = 500,
	},
})

-- Dashboard
require("dashboard").setup({})

-- ChadTree
vim.keymap.set("n", "<leader>n", "<cmd>CHADopen<cr>")

-- Cursorline
require("nvim-cursorline").setup({
	cursorline = {
		enable = true,
		timeout = 1000,
		number = true,
	},
	cursorword = {
		enable = true,
		min_length = 3,
		hl = { underline = true },
	},
})

-- Discord RPC
require("presence").setup({})

-- Bufferline
require("bufferline").setup({})

-- Orgmode
require("orgmode").setup_ts_grammar()
require("orgmode").setup({
	org_agenda_files = "~/orgfiles/**/*",
	org_default_notes_file = "~/orgfiles/refile.org",
})

-- Glow
require("glow").setup({})
vim.keymap.set("n", "<leader>g", "<cmd>Glow<cr>")
