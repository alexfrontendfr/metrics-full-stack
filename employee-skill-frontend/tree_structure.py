import os

def print_directory_tree(path, level=3, exclude_folders=None):
    if exclude_folders is None:
        exclude_folders = []
    
    # Ensure node_modules is always excluded
    exclude_folders.append('node_modules')

    for root, dirs, files in os.walk(path):
        # Remove excluded folders from the list of directories to walk through
        dirs[:] = [d for d in dirs if d not in exclude_folders]

        indent_level = root.replace(path, '').count(os.sep)
        if indent_level < level:
            indent = ' ' * 4 * (indent_level)
            print(f'{indent}{os.path.basename(root)}/')
            subindent = ' ' * 4 * (indent_level + 1)
            for f in files:
                print(f'{subindent}{f}')

# Call the function with an option to exclude specific folders
print_directory_tree('.', exclude_folders=['folder_to_exclude'])