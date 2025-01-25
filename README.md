# Doodle-Draw



---

## Step 1: Install Python 3

1. Download the latest Python 3 installer from the [official Python website](https://www.python.org/downloads/).
2. Run the installer and make sure to check the option **"Add Python to PATH"** before proceeding.
3. Verify the installation:
   ```cmd
   python --version
   ```

---

## Step 2: Install pip

### Verify pip Installation:
Python 3 installations typically come with pip pre-installed. Verify by running:
```cmd
pip --version
```

### If pip is not installed:
1. Download the `get-pip.py` script:
   ```cmd
   curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
   ```
2. Run the script using Python:
   ```cmd
   python get-pip.py
   ```

---

## Step 3: Activate the Virtual Environment

1. Navigate to the directory where the virtual environment `portfolio` is located.
2. Activate the Virtual Environment:
   ```cmd
   portfolio\Scripts\activate
   ```

3. Verify Activation:
   Once activated, your terminal prompt will display `(portfolio)` to indicate the active environment.

---

## Step 4: Install Packages Using pip

Run the following command to train the model:
```cmd
python train_1.py
```

After activating the virtual environment, use pip to install packages(if necessary):
```cmd
pip install <package-name>
```

To save installed packages to a `requirements.txt` file:
```cmd
pip freeze > requirements.txt
```

To install packages from `requirements.txt`:
```cmd
pip install -r requirements.txt
```

---

## Deactivate the Virtual Environment

When you're done, deactivate the virtual environment:
```cmd
deactivate
```

---


