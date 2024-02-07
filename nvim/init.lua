vim.g.mapleader = " "
vim.o.showtabline = 2
vim.opt.sessionoptions = "curdir,folds,globals,help,tabpages,terminal,winsize"
vim.cmd("set number relativenumber ttyfast")

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

-- Keybinds
local function map(mode, lhs, rhs, opts)
	local options = { noremap = true }
	if opts then
		options = vim.tbl_extend("force", options, opts)
	end
	vim.api.nvim_set_keymap(mode, lhs, rhs, options)
end

map("n", "<C-t>", "<cmd>CHADopen<CR>")

-- Nightfox configuration
require("nightfox").setup({
	options = {
		-- Compiled file's destination location
		compile_path = vim.fn.stdpath("cache") .. "/nightfox",
		compile_file_suffix = "_compiled", -- Compiled file suffix
		transparent = false, -- Disable setting background
		terminal_colors = true, -- Set terminal colors (vim.g.terminal_color_*) used in `:terminal`
		dim_inactive = false, -- Non focused panes set to alternative background
		module_default = true, -- Default enable value for modules
		colorblind = {
			enable = false, -- Enable colorblind support
			simulate_only = false, -- Only show simulated colorblind colors and not diff shifted
			severity = {
				protan = 0, -- Severity [0,1] for protan (red)
				deutan = 0, -- Severity [0,1] for deutan (green)
				tritan = 0, -- Severity [0,1] for tritan (blue)
			},
		},
		styles = { -- Style to be applied to different syntax groups
			comments = "italic", -- Value is any valid attr-list value `:help attr-list`
			conditionals = "bold",
			constants = "bold",
			functions = "bold",
			keywords = "bold",
			numbers = "bold",
			operators = "bold",
			strings = "italic",
			types = "bold",
			variables = "italic,bold",
		},
		inverse = { -- Inverse highlight for different types
			match_paren = false,
			visual = false,
			search = false,
		},
		modules = { -- List of various plugins and additional options
			-- ...
		},
	},
	palettes = {},
	specs = {},
	groups = {},
})

vim.cmd("colorscheme carbonfox")

-- LSP
require("mason").setup()
require("mason-lspconfig").setup({
	ensure_installed = { "lua_ls", "clangd", "cssls", "html", "tailwindcss", "tsserver" },
})

-- Treesitter
require("nvim-treesitter.configs").setup({
	ensure_installed = { "c", "lua", "html", "javascript", "typescript", "css" },
	highlight = {
		enable = true,
	},
	indent = {
		enable = true,
	},
})

vim.cmd("set foldmethod=expr foldexpr=nvim_treesitter#foldexpr() nofoldenable")

-- coq_nvim
vim.cmd("COQnow -s")

-- Colorizer
require("colorizer").setup({
	filetypes = { "*" },
	user_default_options = {
		RGB = true, -- #RGB hex codes
		RRGGBB = true, -- #RRGGBB hex codes
		names = true, -- "Name" codes like Blue or blue
		RRGGBBAA = false, -- #RRGGBBAA hex codes
		AARRGGBB = false, -- 0xAARRGGBB hex codes
		rgb_fn = false, -- CSS rgb() and rgba() functions
		hsl_fn = false, -- CSS hsl() and hsla() functions
		css = true, -- Enable all CSS features: rgb_fn, hsl_fn, names, RGB, RRGGBB
		css_fn = true, -- Enable all CSS *functions*: rgb_fn, hsl_fn
		-- Available modes for `mode`: foreground, background,  virtualtext
		mode = "background", -- Set the display mode.
		-- Available methods are false / true / "normal" / "lsp" / "both"
		-- True is same as normal
		tailwind = both, -- Enable tailwind colors
		-- parsers can contain values used in |user_default_options|
		sass = { enable = false, parsers = { "css" } }, -- Enable sass colors
		virtualtext = "■",
		-- update color values even if buffer is not focused
		-- example use: cmp_menu, cmp_docs
		always_update = true,
	},
	-- all the sub-options of filetypes apply to buftypes
	buftypes = {},
})

-- Conform
require("conform").setup({
	formatters_by_ft = {
		lua = { "stylua" },
		-- Use a sub-list to run only the first available formatter
		html = { { "prettier", "prettierd" } },
		typescript = { { "prettier", "prettierd" } },
		css = { { "prettier", "prettierd" } },
		javascript = { { "prettierd", "prettier" } },
	},
	format_on_save = {
		-- These options will be passed to conform.format()
		timeout_ms = 500,
		lsp_fallback = true,
	},
})

-- auto-indent
require("auto-indent").setup({
	lightmode = true, -- Lightmode assumes tabstop and indentexpr not change within buffer's lifetime
	indentexpr = nil, -- Use vim.bo.indentexpr by default, see 'Custom Indent Evaluate Method'
	ignore_filetype = {}, -- Disable plugin for specific filetypes, e.g. ignore_filetype = { 'javascript' }
})

require("nvim-autopairs").setup()

require("feline").setup()
require("feline").statuscolumn.setup()
require("feline").use_theme("default")

require("gitsigns").setup()

-- Tabby
local theme = {
	fill = "TabLine",
	-- Also you can do this: fill = { fg='#f2e9de', bg='#907aa9', style='italic' }
	head = "TabLine",
	current_tab = "TabLine",
	tab = "TabLine",
	win = "TabLine",
	tail = "TabLine",
}
require("tabby.tabline").set(function(line)
	return {
		{
			{ "  ", hl = theme.head },
			line.sep("", theme.head, theme.fill),
		},
		line.tabs().foreach(function(tab)
			local hl = tab.is_current() and theme.current_tab or theme.tab
			return {
				line.sep("", hl, theme.fill),
				tab.is_current() and "" or "󰆣",
				tab.number(),
				tab.name(),
				tab.close_btn(""),
				line.sep("", hl, theme.fill),
				hl = hl,
				margin = " ",
			}
		end),
		line.spacer(),
		line.wins_in_tab(line.api.get_current_tab()).foreach(function(win)
			return {
				line.sep("", theme.win, theme.fill),
				win.is_current() and "" or "",
				win.buf_name(),
				line.sep("", theme.win, theme.fill),
				hl = theme.win,
				margin = " ",
			}
		end),
		{
			line.sep("", theme.tail, theme.fill),
			{ "  ", hl = theme.tail },
		},
		hl = theme.fill,
	}
end)
