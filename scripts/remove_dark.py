import os
import re

def remove_dark_classes(directory):
    # Regex to find 'dark:something' followed by optional space or closing quote/curly brace
    # It catches:
    # 1. dark:bg-slate-900
    # 2. dark:hover:bg-slate-800
    # 3. "dark:text-white "
    # 4. "text-black dark:text-white"
    
    # regex = re.compile(r'\bdark:[^\s"`\'\}]*\s?')
    # A safer approach for tailwind classes:
    regex = re.compile(r'\s?dark:[\w\-\.\/\[\]\:\#\%]+')

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.js', '.jsx')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = regex.sub('', content)
                    
                    if new_content != content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {path}")
                except Exception as e:
                    print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    target_dir = r"c:\Users\Administrator\.cursor\Yalla7play\src"
    remove_dark_classes(target_dir)
