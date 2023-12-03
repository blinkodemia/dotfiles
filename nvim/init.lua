vim.g.mapleader = " "
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

require("lualine").setup({})
require("mason").setup()
require("mason-lspconfig").setup()
require("lspconfig").lua_ls.setup(coq.lsp_ensure_capabilities())
require("lspconfig").clangd.setup(coq.lsp_ensure_capabilities())
require("lspconfig").rust_analyzer.setup(coq.lsp_ensure_capabilities())
require("lspconfig").eslint.setup(coq.lsp_ensure_capabilities())
require("nvim-treesitter").setup({})
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

require("dashboard").setup({})
